import * as vscode from 'vscode';
import * as https from 'https';
import { getTranslation } from './i18n';
import { PricingConfig } from './types';
import { isNewerVersion } from './utils/version';

const REPO_OWNER = 'trinhhaox';
const REPO_NAME = 'antigravity-cost';
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
                'User-Agent': 'Antigravity-AI-Cost-Extension',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        https.get(RELEASES_API_URL, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const release = JSON.parse(data);
                        const latestTag = release.tag_name || '';
                        const latestVersion = latestTag.replace(/^v/, '');

                        if (latestVersion && isNewerVersion(currentVersion, latestVersion)) {
                            showUpdateNotification(latestVersion, release.html_url, isEn);
                        } else if (isManual) {
                            const upToDateMsg = isEn
                                ? `Antigravity AI Cost is up to date (v${currentVersion}).`
                                : `Antigravity AI Cost đã là phiên bản mới nhất (v${currentVersion}).`;
                            vscode.window.showInformationMessage(upToDateMsg);
                        }
                    } catch (e) {
                        // Fallback check tags
                        fallbackCheckTags(currentVersion, isEn, isManual);
                    }
                } else {
                    // Fallback to tags if releases 404
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
            'User-Agent': 'Antigravity-AI-Cost-Extension',
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    https.get(TAGS_API_URL, options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    const tags = JSON.parse(data);
                    if (Array.isArray(tags) && tags.length > 0) {
                        const latestTag = tags[0].name || '';
                        const latestVersion = latestTag.replace(/^v/, '');

                        if (latestVersion && isNewerVersion(currentVersion, latestVersion)) {
                            const releaseUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;
                            showUpdateNotification(latestVersion, releaseUrl, isEn);
                            return;
                        }
                    }
                } catch { }
            }

            if (isManual) {
                const upToDateMsg = isEn
                    ? `Antigravity AI Cost is up to date (v${currentVersion}).`
                    : `Antigravity AI Cost đã là phiên bản mới nhất (v${currentVersion}).`;
                vscode.window.showInformationMessage(upToDateMsg);
            }
        });
    }).on('error', () => { });
}


async function showUpdateNotification(newVersion: string, url: string, isEn: boolean) {
    const actionDownload = isEn ? 'Download Update' : 'Tải Về Ngay';
    const actionChangelog = isEn ? 'View Changelog' : 'Xem Chi Tiết';

    const message = isEn
        ? `🚀 A new version of Antigravity AI Cost (v${newVersion}) is available on GitHub!`
        : `🚀 Đã có phiên bản mới của Antigravity AI Cost (v${newVersion}) trên GitHub!`;

    const result = await vscode.window.showInformationMessage(
        message,
        actionDownload,
        actionChangelog
    );

    if (result === actionDownload || result === actionChangelog) {
        vscode.env.openExternal(vscode.Uri.parse(url));
    }
}
