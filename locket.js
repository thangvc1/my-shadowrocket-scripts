// ============================================================
// Locket Remote Config - NATIVE UI UNLOCK (Perfect Fix)
// Khôi phục 45s, Mic. Bật AI, Photobooth. Không can thiệp UI.
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "FULL VIP - Đã kích hoạt AI, Photobooth & 45s!";
    obj.entries = obj.entries || {};

    // 1. KÍCH HOẠT CỜ VIP (Ép App mở khóa tính năng)
    Object.assign(obj.entries, {
        is_premium: "true",
        is_gold: "true",
        premium: "true",
        
        feature_gates: JSON.stringify({
            app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled",
            locket_views: "enabled", long_captions: "enabled", longer_video: "enabled",
            unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled",
            remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled",
            streak_recovery: "enabled", photobooth: "enabled", ai_filters: "enabled",
            gen_ai: "enabled", camera_filter: "enabled"
        }),
        
        // Bật cờ cho AI và Photobooth (Nhưng KHÔNG chèn danh sách Filter/Khung ảo)
        photobooth_enabled: "true",
        ai_filters_enabled: "true",
        gen_ai_enabled: "true",
        collage_enabled: "true",
        
        history_ads_mode: "off",
        sentry_sample_rate: "0"
    });

    // 2. KHÔI PHỤC 45S & MIC (Bản chuẩn của DINH DUY VINH)
    var MY_VIDEO_DURATION = 45.0;
    
    var cameraConfig = {
        gold_max_duration: MY_VIDEO_DURATION, goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION, maxDuration: MY_VIDEO_DURATION,
        ultra_wide: true, ultraWide: true, volume_button: true, volumeButton: true,
        flash_button: true, telephoto: true, srgb: true, lanczos: true,
        quality_mbps: 0.6, qualityMbps: 0.6, enable_audio: true, microphone_enabled: true
    };

    var cameraRollConfig = {
        gold_max_duration: MY_VIDEO_DURATION, goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION, videoMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION, maxDuration: MY_VIDEO_DURATION,
        trim_max_duration: MY_VIDEO_DURATION, trimMaxDuration: MY_VIDEO_DURATION,
        camera_roll_max_duration: MY_VIDEO_DURATION, camera_roll_video_max_duration: MY_VIDEO_DURATION,
        max_file_size: 104857600, max_upload_bytes: 104857600, max_size_bytes: 104857600,
        quality_mbps: 0.6, qualityMbps: 0.6, flash_button: true
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    var durationStr = MY_VIDEO_DURATION.toString();
    Object.assign(obj.entries, {
        max_video_duration: durationStr, video_max_duration: durationStr,
        camera_roll_max_duration: durationStr, max_capture_duration: durationStr,
        
        // Khôi phục Mic
        video_sound_enabled: "true", microphone_enabled: "true", 
        camera_microphone_enabled: "true", audio_session_deactivation_enabled: "true",
        record_audio: "true", enable_audio: "true",
        
        // CÁC TÍNH NĂNG KHÁC
        camera_roll_preview_enabled: "true", camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true", longer_camera_roll_videos_enabled: "true",
        max_friends_count: "999999", moment_views_enabled: "true",
        chat_reactions_enabled: "true", custom_profile_pics: "true"
    });

    // 3. TUYỆT ĐỐI KHÔNG CHÈN camera_filter_config VÀO ĐÂY NỮA
    // Để App tự gọi API getFilters (đã trả về 200 OK) và tự vẽ giao diện.
    // Tương tự, xóa bỏ widget_frames_config để App tự tải Khung Photobooth.
    delete obj.entries.camera_filter_config;
    delete obj.entries.widget_frames_config;
    delete obj.entries.widget_frame_styles;
}

$done({ body: JSON.stringify(obj) });
