// ============================================================
// Locket Remote Config - BYPASS CACHE & FULL UNLOCK
// ============================================================
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // 1. ÉP CỜ PREMIUM LÊN TẬN CÙNG
    Object.assign(obj.entries, {
        is_premium: "true",
        is_gold: "true",
        premium: "true",
        entitlement_active: "true",
        
        // 2. KHÓA CHẶN CÁC TÍNH NĂNG (FEATURE GATES CHUẨN)
        feature_gates: JSON.stringify({
            app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled",
            locket_views: "enabled", long_captions: "enabled", longer_video: "enabled",
            unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled",
            remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled",
            streak_recovery: "enabled", photobooth: "enabled", ai_filters: "enabled",
            gen_ai: "enabled", camera_filter: "enabled", locket_ai: "enabled"
        }),

        // 3. BẬT PHOTOBOOTH (Không can thiệp widget_frames_config)
        photobooth_enabled: "true",
        photobooth_frames_enabled: "true",
        photobooth_frame_picker_enabled: "true",
        custom_widget_frames_enabled: "true",

        // 4. BẬT AI (GEN AI & FILTER AI)
        ai_filters_enabled: "true",
        gen_ai_enabled: "true",
        ai_look_generation_enabled: "true",
        ai_avatar_enabled: "true",

        // 5. CẤU HÌNH CAMERA 45S & MIC
        camera: JSON.stringify({
            gold_max_duration: 45.0, goldMaxDuration: 45.0,
            max_duration: 45.0, maxDuration: 45.0,
            enable_audio: true, microphone_enabled: true,
            ultra_wide: true, telephoto: true
        }),
        camera_roll: JSON.stringify({
            gold_max_duration: 45.0, goldMaxDuration: 45.0,
            video_max_duration: 45.0, videoMaxDuration: 45.0,
            max_duration: 45.0, maxDuration: 45.0
        }),
        max_video_duration: "45.0",
        video_max_duration: "45.0",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",

        // 6. FIX LỖI FILTER KHÔNG BẤM ĐƯỢC
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: true,
            filter_engine_enabled: true,
            sticker_engine_enabled: true,
            sheet_filters: [
                { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
                { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
                { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
                { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
                { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
                { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
            ],
            picker_filters: [
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
                "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
                "tatted", "mohawk", "braces", "slimed", "princess",
                "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
                "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
                "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
                "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
            ]
        }),
        camera_filter_enabled: "true",
        camera_filters_enabled: "true",

        // 7. BẠN BÈ & TƯƠNG TÁC
        max_friends_count: "999999",
        moment_views_enabled: "true",
        chat_reactions_enabled: "true",
        typing_indicators_enabled: "true",
        custom_profile_pics: "true",
        
        // (Đã lược bớt một số Caption không cần thiết để Payload nhẹ hơn, giúp App không bị nghẽn)
    });
}

$done({ body: JSON.stringify(obj) });
