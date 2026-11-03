// ============================================================
// LOCKET REMOTE CONFIG - SAFE INJECT (Dựa trên V6 của ngominhduc)
// Đảm bảo hiện UI, không gây lỗi giao diện
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

// Hàm tiêm cấu hình an toàn từ V6 (không phá hỏng cấu trúc UI)
function injectFirebaseRemoteConfig(obj) {
    if (!obj || typeof obj !== "object") obj = {};
    if (!obj.entries || typeof obj.entries !== "object") obj.entries = {};

    const quotaStr = "999999";

    const forcedEntries = {
        "locket_gold_enabled": "true",
        "is_gold_user": "true",
        "bypass_gold_paywall": "true",
        "disable_gold_paywall": "true",
        "show_gold_paywall": "false",
        "force_gold_for_effects": "false",
        "require_gold_for_effects": "false",
        "require_gold_for_holiday_effects": "false",
        "require_gold_for_filters": "false",
        "require_gold_for_ai_looks": "false",
        "lock_holiday_effects": "false",
        "lock_camera_effects": "false",
        "lock_ai_filters": "false",
        "blur_locked_effects": "false",
        "all_effects_free": "true",
        "unlock_all_effects": "true",
        "unlock_all_filters": "true",
        "camera_effects_enabled": "true",
        "ai_filter_enabled": "true",
        "ai_filters_enabled": "true",
        "enable_ai_filters": "true",
        "enable_ai_looks": "true",
        "create_look_enabled": "true",
        "photobooth_enabled": "true",
        "photobooth_frames_enabled": "true",
        "ai_filter_free_uses": quotaStr,
        "ai_filter_daily_limit": quotaStr,
        "ai_filter_quota": quotaStr,
        "ai_looks_free_uses": quotaStr,
        "ai_generation_limit": quotaStr,
        "custom_look_daily_limit": quotaStr
    };

    // Quét qua các key hiện có và thay thế nếu cần
    for (const existingKey of Object.keys(obj.entries)) {
        const low = existingKey.toLowerCase();
        const rawVal = obj.entries[existingKey];

        if (low.includes("ai") || low.includes("filter") || low.includes("look") || low.includes("effect") || low.includes("holiday")) {
            if (low.includes("limit") || low.includes("quota") || low.includes("max") || low.includes("count") || low.includes("remaining") || low.includes("uses")) {
                obj.entries[existingKey] = quotaStr;
            } else if (low.includes("gold_only") || low.includes("require_gold") || low.includes("is_locked") || low.includes("locked") || low.includes("paywall") || low.includes("blur") || low.includes("premium_only")) {
                obj.entries[existingKey] = "false";
            } else if (low.includes("enable") || low.includes("allow") || low.includes("active") || low.includes("show") || low.includes("free") || low.includes("unlock")) {
                obj.entries[existingKey] = "true";
            }
        }
    }

    // Ghi đè các key cưỡng bức
    for (const [k, v] of Object.entries(forcedEntries)) {
        obj.entries[k] = v;
    }

    obj.state = "UPDATE";
    return obj;
}

if (ua.includes("Locket")) {
    // 1. Chạy hàm tiêm cấu hình VIP an toàn
    obj = injectFirebaseRemoteConfig(obj);

    obj.entries = obj.entries || {};

    // 2. Cấu hình Camera 45s & Mic (Giữ nguyên để đảm bảo không mất tính năng)
    var MY_VIDEO_DURATION = 45.0;
    var cameraConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        enable_audio: true, microphone_enabled: true
    };
    var cameraRollConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION,
        videoMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        enable_audio: true, microphone_enabled: true
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    var durationStr = MY_VIDEO_DURATION.toString();
    Object.assign(obj.entries, {
        max_video_duration: durationStr,
        video_max_duration: durationStr,
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true"
    });
}

$done({ body: JSON.stringify(obj) });
