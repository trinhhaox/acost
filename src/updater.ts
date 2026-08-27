import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PricingConfig } from './types';
import { isNewerVersion } from './utils/version';

const REPO_OWNER = 'trinhhaox';
const REPO_NAME = 'acost';
const RELEASES_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const TAGS_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/tags`;

export { isNewerVersion };

export async function checkForUpdates(context: vscode.ExtensionContext, config: PricingConfig, isManual = false) {
    try {
        const currentVersion = context.extension.packageJSON.version || '1.0.0';
        const lang = config.language || 'vi';
        const isEn = lang === 'en';

        const options = {
            headers: {
                'User-Agent': 'Acost-Extension',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        https.get(RELEASES_API_URL, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                if (res.statusCode === 200) {
                    try {
                        const release = JSON.parse(data);
                        const latestTag = release.tag_name || '';
                        const latestVersion = latestTag.replace(/^v/, '');

                        if (latestVersion && isNewerVersion(currentVersion, latestVersion)) {
                            // Tìm file vsix đính kèm trong assets nếu có
                            let vsixAssetUrl = '';
                            if (Array.isArray(release.assets)) {
                                const vsixAsset = release.assets.find((a: any) => a.name && a.name.endsWith('.vsix'));
                                if (vsixAsset && vsixAsset.browser_download_url) {
                                    vsixAssetUrl = vsixAsset.browser_download_url;
                                }
                            }
                            await showUpdateNotification(latestVersion, release.html_url, vsixAssetUrl, isEn);
                        } else if (isManual) {
                            const upToDateMsg = isEn
                                ? `Acost is up to date (v${currentVersion}).`
                                : `Acost đã là phiên bản mới nhất (v${currentVersion}).`;
                            vscode.window.showInformationMessage(upToDateMsg);
                        }
                    } catch (e) {
                        fallbackCheckTags(currentVersion, isEn, isManual);
                    }
                } else {
                    fallbackCheckTags(currentVersion, isEn, isManual);
                }
            });
        }).on('error', (e) => {
            if (isManual) {
                vscode.window.showErrorMessage(isEn ? `Failed to check for updates: ${e.message}` : `Lỗi khi kiểm tra cập nhật: ${e.message}`);
            }
        });

    } catch (err: any) {
        if (isManual) {
            vscode.window.showErrorMessage(`Update check error: ${err?.message || err}`);
        }
    }
}

function fallbackCheckTags(currentVersion: string, isEn: boolean, isManual: boolean) {
    const options = {
        headers: {
            'User-Agent': 'Acost-Extension',
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    https.get(TAGS_API_URL, options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', async () => {
            if (res.statusCode === 200) {
                try {
                    const tags = JSON.parse(data);
                    if (Array.isArray(tags) && tags.length > 0) {
                        const latestTag = tags[0].name || '';
                        const latestVersion = latestTag.replace(/^v/, '');

                        if (latestVersion && isNewerVersion(currentVersion, latestVersion)) {
                            const releaseUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;
                            await showUpdateNotification(latestVersion, releaseUrl, '', isEn);
                            return;
                        }
                    }
                } catch { }
            }

            if (isManual) {
                const upToDateMsg = isEn
                    ? `Acost is up to date (v${currentVersion}).`
                    : `Acost đã là phiên bản mới nhất (v${currentVersion}).`;
                vscode.window.showInformationMessage(upToDateMsg);
            }
        });
    }).on('error', () => { });
}

async function showUpdateNotification(newVersion: string, releasePageUrl: string, vsixDownloadUrl: string, isEn: boolean) {
    const actionAutoInstall = isEn ? '⚡ 1-Click Update' : '⚡ Cập Nhật Tự Động';
    const actionDownload = isEn ? '🌐 Open GitHub' : '🌐 Xem Bản Phát Hành';
    const actionLater = isEn ? 'Later' : 'Để Sau';

    const message = isEn
        ? `🚀 Acost v${newVersion} is now available! Would you like to update?`
        : `🚀 Đã có phiên bản mới Acost v${newVersion}! Bạn có muốn cập nhật ngay không?`;

    const actions = vsixDownloadUrl ? [actionAutoInstall, actionDownload, actionLater] : [actionDownload, actionLater];

    const choice = await vscode.window.showInformationMessage(message, ...actions);

    if (choice === actionAutoInstall && vsixDownloadUrl) {
        await downloadAndInstallVsix(vsixDownloadUrl, newVersion, isEn);
    } else if (choice === actionDownload) {
        vscode.env.openExternal(vscode.Uri.parse(releasePageUrl));
    }
}

/**
 * Tải file VSIX từ URL về và tự động cài đặt
 */
async function downloadAndInstallVsix(url: string, version: string, isEn: boolean) {
    const progressTitle = isEn
        ? `Downloading Acost v${version}...`
        : `Đang tải bản cập nhật Acost v${version}...`;

    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: progressTitle,
            cancellable: false
        },
        async (progress) => {
            const tempFile = path.join(os.tmpdir(), `acost-${version}-${Date.now()}.vsix`);

            try {
                await downloadFile(url, tempFile, (percent) => {
                    progress.report({ message: `${percent}%` });
                });

                // Cài đặt extension
                const installProgress = isEn ? 'Installing update...' : 'Đang cài đặt cập nhật...';
                progress.report({ message: installProgress });

                const vsixUri = vscode.Uri.file(tempFile);
                await vscode.commands.executeCommand('workbench.extensions.installExtension', vsixUri);

                // Thông báo thành công và đề xuất reload
                const reloadAction = isEn ? '🔄 Reload Window' : '🔄 Khởi Động Lại';
                const successMsg = isEn
                    ? `🎉 Acost has been updated to v${version}! Please reload to apply changes.`
                    : `🎉 Đã cập nhật Acost lên v${version} thành công! Vui lòng khởi động lại để áp dụng.`;

                const res = await vscode.window.showInformationMessage(successMsg, reloadAction);
                if (res === reloadAction) {
                    await vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            } catch (err: any) {
                const failMsg = isEn
                    ? `Failed to automatically update: ${err.message}. Please download manually.`
                    : `Không thể tự động cập nhật: ${err.message}. Vui lòng tải thủ công từ GitHub.`;
                const manualAction = isEn ? 'Download Manually' : 'Tải Thủ Công';
                const res = await vscode.window.showErrorMessage(failMsg, manualAction);
                if (res === manualAction) {
                    vscode.env.openExternal(vscode.Uri.parse(`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`));
                }
            } finally {
                // Xóa file tạm sau khi cài
                try {
                    if (fs.existsSync(tempFile)) {
                        fs.unlinkSync(tempFile);
                    }
                } catch {}
            }
        }
    );
}

/**
 * Helper tải file với redirect support
 */
function downloadFile(url: string, destPath: string, onProgress?: (percent: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
        const handleRequest = (currentUrl: string) => {
            const request = https.get(
                currentUrl,
                { headers: { 'User-Agent': 'Acost-Extension' } },
                (res) => {
                    // Handle HTTP 301 / 302 redirects (GitHub CDN redirects)
                    if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
                        if (res.headers.location) {
                            handleRequest(res.headers.location);
                            return;
                        }
                    }

                    if (res.statusCode !== 200) {
                        reject(new Error(`Server returned HTTP ${res.statusCode}`));
                        return;
                    }

                    const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
                    let downloadedBytes = 0;

                    const fileStream = fs.createWriteStream(destPath);
                    res.pipe(fileStream);

                    res.on('data', (chunk) => {
                        downloadedBytes += chunk.length;
                        if (totalBytes > 0 && onProgress) {
                            const percent = Math.round((downloadedBytes / totalBytes) * 100);
                            onProgress(percent);
                        }
                    });

                    fileStream.on('finish', () => {
                        fileStream.close();
                        resolve();
                    });

                    fileStream.on('error', (err) => {
                        fs.unlink(destPath, () => {});
                        reject(err);
                    });
                }
            );

            request.on('error', (err) => {
                fs.unlink(destPath, () => {});
                reject(err);
            });
        };

        handleRequest(url);
    });
}

