// ============================================================
// Locket Remote Config - FINAL ULTIMATE FIX
// Đã khôi phục 45s, Mic. Bật AI, Filter, Photobooth. Xóa Khung ảo lỗi.
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Bản FULL VIP - AI, Filter, Photobooth đã kích hoạt!";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. ÉP CỜ PREMIUM VÀ BẬT CÁC TÍNH NĂNG (Kể cả AI & Photobooth)
    // ============================================================
    Object.assign(obj.entries, {
        is_premium: "true",
        is_gold: "true",
        premium: "true",
        
        feature_gates: JSON.stringify({
            app_icon_picker: "enabled",
            camera_roll: "enabled",
            camera_theme: "enabled",
            locket_views: "enabled",
            long_captions: "enabled",
            longer_video: "enabled",
            unlimited_friends: "enabled",
            priority_support: "enabled",
            profile_badge: "enabled",
            remove_ads: "enabled",
            video: "enabled",
            custom_widget_frames: "enabled",
            streak_recovery: "enabled",
            photobooth: "enabled",     // Kích hoạt Photobooth
            ai_filters: "enabled",     // Kích hoạt Filter AI
            gen_ai: "enabled",         // Kích hoạt Gen AI
            camera_filter: "enabled"   // Kích hoạt nút Filter
        }),
        photobooth_enabled: "true",
        ai_filters_enabled: "true",
        gen_ai_enabled: "true",
        collage_enabled: "true",
        
        // Tắt quảng cáo
        history_ads_mode: "off",
        sentry_sample_rate: "0"
    });

    // ============================================================
    // 2. CAMERA, VIDEO & MIC (Khôi phục nguyên bản 45s)
    // ============================================================
    var MY_VIDEO_DURATION = 45.0;
    
    var cameraConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        ultra_wide: true,
        ultraWide: true,
        volume_button: true,
        volumeButton: true,
        flash_button: true,
        telephoto: true,
        srgb: true,
        lanczos: true,
        quality_mbps: 0.6,
        qualityMbps: 0.6
    };

    var cameraRollConfig = {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION,
        videoMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        trim_max_duration: MY_VIDEO_DURATION,
        trimMaxDuration: MY_VIDEO_DURATION,
        camera_roll_max_duration: MY_VIDEO_DURATION,
        camera_roll_video_max_duration: MY_VIDEO_DURATION,
        max_file_size: 104857600,
        max_upload_bytes: 104857600,
        max_size_bytes: 104857600,
        quality_mbps: 0.6,
        qualityMbps: 0.6,
        flash_button: true
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    var durationStr = MY_VIDEO_DURATION.toString();
    Object.assign(obj.entries, {
        live_photos: JSON.stringify({
            capture: true, viewing: true, catch_up: true, widget_looping_mode: "never"
        }),
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true, show_filter_button: true, sheet_enabled: true, open_sheet_immediately: true,
            sheet_filters: [
                { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
                { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
                { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
                { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
                { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
                { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
            ],
            picker_filters: [
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows", "bowling_ball", "blonde_bleached", 
                "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "slimed", "princess", "disco_lights", 
                "cash_money", "happy_birthday", "cutesy", "sticker_face", "flower_crown", "love_bug", "wedding", 
                "cowboy_cowgirl", "giraffe", "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", 
                "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
            ]
        }),
        camera_filter_enabled: "true",
        camera_filters_enabled: "true",
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: durationStr,
        camera_roll_max_duration: durationStr,
        camera_roll_duration: durationStr,
        max_video_duration: durationStr,
        video_max_duration: durationStr,
        video_trim_max_duration: durationStr,
        trim_max_duration: durationStr,
        gold_max_duration: durationStr,
        goldMaxDuration: durationStr,
        max_file_size: "104857600",
        max_upload_bytes: "104857600",
        video_quality_mbps: "0.6",
        
        // KHÔI PHỤC MIC
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        enable_audio: "true",
        record_audio: "true",
        
        zoom_enabled: "true",
        upload_main: "false",
        upload_main_image_quality: "0.6",
        upload_main_image_size: "1440",
        upload_thumbnail_image_quality: "0.6",
        upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 3. PHOTOBOOTH & WIDGET (Đã xóa bỏ đoạn code Khung Ảo gây lỗi)
    // ============================================================
    Object.assign(obj.entries, {
        widget_frame_event_max_images: "10",
        android_widget_frame_event_enabled: "true",
        widget_badge_enabled: "true",
        widget_badge_v2: "true",
        widget_sync_token_reload_mode: "clearTokenNever",
        
        // Đã xóa widget_frames_config. App sẽ tự tải khung thật từ Server.
        custom_widget_frames: "enabled",
        custom_widget_frames_enabled: "true",
        photobooth_enabled: "true",
        photobooth_frames_enabled: "true",
        photobooth_frame_picker_enabled: "true",
        
        live_activity_onboarding: "true",
        notification_preferences_live_activities: "true",
        notification_preferences: "true",
        activity_bar_enabled: "true",
        journal_activity_bar_enabled: "true",
        custom_profile_pics: "true",
        profile_menu_v2_enabled: "true"
    });

    // ============================================================
    // 4. BẠN BÈ & CHAT
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        friend_limit_mode: "0",
        moment_views_enabled: "true",
        record_moment_views: "true",
        chat_reactions_enabled: "true",
        conversation_reactions: "true",
        typing_indicators_enabled: "true",
        groups_enabled: "true",
        send_to_self_only_mode: "always_enabled"
    });
}

$done({ body: JSON.stringify(obj) });
