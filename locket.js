// ============================================================
// Locket Remote Config - ULTIMATE FULL VERSION
// Fix 100%: 45s, Mic, Photobooth, AI, Filter (Bấm ăn ngay)
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Bản FULL VIP - Đã mở khóa toàn bộ AI, Photobooth & Filter!";
    obj.entries = obj.entries || {};

    // 1. KÍCH HOẠT TOÀN DIỆN (GOLD & PREMIUM FLAGS)
    Object.assign(obj.entries, {
        is_premium: "true",             // Bắt buộc để bấm AI/Filter không bị lỗi
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
            photobooth: "enabled",      
            ai_filters: "enabled",      
            gen_ai: "enabled",          
            camera_filter: "enabled",
            locket_ai: "enabled"
        }),
        upsell_features: JSON.stringify({
            app_icon_picker: true, camera_roll: true, camera_theme: true, locket_views: true,
            remove_ads: true, custom_widget_frames: true, photobooth: true, ai_filters: true, gen_ai: true
        }),
        // Bật cờ trực tiếp cho các module
        photobooth_enabled: "true",
        ai_filters_enabled: "true",
        gen_ai_enabled: "true",
        ai_look_generation_enabled: "true",
        collage_enabled: "true",
        
        // Tắt quảng cáo
        history_ads_mode: "off",
        history_ads_prefetch_count: "0",
        sentry_sample_rate: "0"
    });

    // 2. CAMERA, VIDEO, 45S, MIC & UPLOAD (Giữ nguyên bản chạy tốt)
    var MY_VIDEO_DURATION = 45.0;
    
    obj.entries.camera = JSON.stringify({
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        ultra_wide: true, telephoto: true, srgb: true, lanczos: true,
        quality_mbps: 0.6, qualityMbps: 0.6,
        enable_audio: true, microphone_enabled: true
    });

    obj.entries.camera_roll = JSON.stringify({
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION,
        videoMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        trim_max_duration: MY_VIDEO_DURATION,
        trimMaxDuration: MY_VIDEO_DURATION,
        camera_roll_max_duration: MY_VIDEO_DURATION,
        max_file_size: 104857600,
        max_upload_bytes: 104857600
    });

    var durationStr = MY_VIDEO_DURATION.toString();
    Object.assign(obj.entries, {
        live_photos: JSON.stringify({ capture: true, viewing: true, catch_up: true }),
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        camera_roll_video_max_duration: durationStr,
        camera_roll_max_duration: durationStr,
        max_video_duration: durationStr,
        video_max_duration: durationStr,
        gold_max_duration: durationStr,
        goldMaxDuration: durationStr,
        max_capture_duration: durationStr,
        
        // MIC
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        record_audio: "true"
    });

    // 3. FIX LỖI BẤM FILTER KHÔNG ĂN & BẬT STICKER
    obj.entries.camera_filter_config = JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true,
        sticker_engine_enabled: true,
        filter_engine_enabled: true,
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
    });
    obj.entries.camera_filter_enabled = "true";
    obj.entries.camera_filters_enabled = "true";

    // 4. FIX LỖI MẤT PHOTOBOOTH
    // TUYỆT ĐỐI KHÔNG set widget_frames_config, để app tự tải khung thật từ server
    delete obj.entries.widget_frames_config; 
    
    Object.assign(obj.entries, {
        custom_widget_frames: "enabled",
        custom_widget_frames_enabled: "true",
        photobooth_enabled: "true",
        photobooth_frames_enabled: "true",
        photobooth_frame_picker_enabled: "true",
        photobooth_show_frame_picker: "true",
        photobooth_config: JSON.stringify({ enabled: true, frames_enabled: true }),
        widget_frame_event_max_images: "10",
        android_widget_frame_event_enabled: "true"
    });

    // 5. BẠN BÈ, TƯƠNG TÁC, THÔNG BÁO
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        friend_limit_mode: "0",
        moment_views_enabled: "true",
        record_moment_views: "true",
        chat_reactions_enabled: "true",
        typing_indicators_enabled: "true",
        hide_chat_button: "false",
        live_activity_onboarding: "true",
        notification_preferences: "true",
        custom_profile_pics: "true"
    });

    // 6. CAPTIONS TIẾNG VIỆT (Giữ nguyên toàn bộ của bạn)
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        captions_enabled: "true",
        music_caption_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([
            "standard", "poll", "color_palette", "review", "music", "location",
            "weather", "time", "streak", "star_sign", "party_time", "locket_count",
            "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026"
        ]),
        overlay_items: JSON.stringify([
            {
                section: "🎨 General",
                items: [
                    { overlay_id: "caption:standard", source: "local", caption: { type: "standard" } },
                    { overlay_id: "caption:review", source: "local", caption: { type: "review" } },
                    { overlay_id: "caption:music", source: "local", caption: { type: "music" } },
                    { overlay_id: "caption:location", source: "local", caption: { type: "location" } },
                    { overlay_id: "caption:weather", source: "local", caption: { type: "weather" } },
                    { overlay_id: "caption:time", source: "local", caption: { type: "time" } },
                    { overlay_id: "caption:streak", source: "local", caption: { type: "streak" } },
                    { overlay_id: "caption:star_sign", source: "local", caption: { type: "star_sign" } },
                    { overlay_id: "caption:poll", source: "local", caption: { type: "poll" } },
                    { overlay_id: "caption:color_palette", source: "local", caption: { type: "color_palette" } },
                    { overlay_id: "caption:locket_count", source: "local", caption: { type: "locket_count" } }
                ]
            },
            {
                section: "🎨 Holiday Caption",
                items: [
                    { overlay_id: "caption:halloween_2026", source: "remote", caption: { background: { colors: ["#150804", "#C8540D"] }, icon: { data: "🎃", type: "emoji" }, max_lines: 1, text: "Halloween", localized_text: { en: "Halloween", vn: "Halloween" }, text_color: "#FFB182", type: "static_content" } },
                    { overlay_id: "caption:autumn_2026", source: "remote", caption: { background: { colors: ["#FFE0A0", "#F6A53A"] }, icon: { data: "🍂", type: "emoji" }, max_lines: 1, text: "Xin chào Mùa Thu", localized_text: { en: "Xin chào Mùa Thu", vn: "Xin chào Mùa Thu" }, text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:christmas_eve_2026", source: "remote", caption: { background: { colors: ["#2FA85F", "#176B3A"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Giáng sinh an lành", localized_text: { en: "Giáng sinh an lành", vn: "Giáng sinh an lành" }, text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:christmas_day_2026", source: "remote", caption: { background: { colors: ["#E53935", "#A81818"] }, icon: { data: "🎄", type: "emoji" }, max_lines: 1, text: "Giáng sinh an lành", localized_text: { en: "Giáng sinh an lành", vn: "Giáng sinh an lành" }, text_color: "#FFFFFF", type: "static_content" } },
                    { overlay_id: "caption:new_years_eve_2026", source: "remote", caption: { background: { colors: ["#FFC64B", "#FFEDBF"] }, icon: { data: "🥂", type: "emoji" }, max_lines: 1, text: "Xin chào 2027!", localized_text: { en: "Xin chào 2027!", vn: "Xin chào 2027!" }, text_color: "#643F00", type: "static_content" } },
                    { overlay_id: "caption:new_years_day_2027", source: "remote", caption: { background: { colors: ["#3B00EC", "#823FFF"] }, icon: { data: "💫", type: "emoji" }, max_lines: 1, text: "Xin chào 2027!", localized_text: { en: "Xin chào 2027!", vn: "Xin chào 2027!" }, text_color: "#FFFFFF", type: "static_content" } }
                ]
            },
            {
                section: "🎨🎨🎨🎨🎨🎨",
                items: [
                    { overlay_id: "caption:nca", source: "remote", caption: { background: { colors: ["#B8E7FF", "#A8F5D0", "#DCCBFF"] }, max_lines: 1, text: "nguyencongan", text_color: "#183153", type: "static_content" } },
                    { overlay_id: "caption:feeling_cute", source: "remote", caption: { background: { colors: ["#F8BBD0", "#E91E63"] }, icon: { data: "🌷", type: "emoji" }, max_lines: 1, text: "Feeling Cute", localized_text: { en: "Feeling Cute", vn: "Cảm thấy dthw" }, text_color: "#FFFFFFE5", type: "static_content" } },
                    { overlay_id: "caption:cu", source: "remote", caption: { background: { colors: ["#FFD6A5", "#FFF1A8", "#FFC4D6"] }, max_lines: 1, text: "Cu 🐎", text_color: "#633B24", type: "static_content" } },
                    { overlay_id: "caption:wedding_time", source: "remote", caption: { background: { colors: ["#FFE4E1", "#E73C7E"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "Wedding Time!", localized_text: { en: "Wedding Time!", vn: "Đám cưới nè!" }, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:coffee_time", source: "remote", caption: { background: { colors: ["#4E342E", "#8D6E63"] }, icon: { data: "☕", type: "emoji" }, max_lines: 1, text: "Coffee Time!", localized_text: { en: "Coffee Time!", vn: "Giờ uống cà phê!" }, text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:locket_time", source: "remote", caption: { background: { colors: ["#ECEFF1", "#B3E5FC"] }, icon: { data: "📷", type: "emoji" }, max_lines: 1, text: "Locket Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:cinema_time", source: "remote", caption: { background: { colors: ["#1A237E", "#455A64"] }, icon: { data: "🎬", type: "emoji" }, max_lines: 1, text: "Cinema Time!", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Độc lạ",
                items: [
                    { overlay_id: "caption:xin_vinh_biet_cu", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Xin vĩnh biệt cụ", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:chay_ngay_di", source: "remote", caption: { background: { colors: ["#D31027", "#EA384D"] }, icon: { data: "🏃💨", type: "emoji" }, max_lines: 1, text: "Chạy ngay đi", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:cu_tu_tu_khoai_se_nhu", source: "remote", caption: { background: { colors: ["#56AB2F", "#A8E063"] }, icon: { data: "🥔", type: "emoji" }, max_lines: 1, text: "Cứ từ từ khoai sẽ nhừ", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:con_cai_nit", source: "remote", caption: { background: { colors: ["#D7CCC8", "#8D6E63"] }, icon: { data: "🧶", type: "emoji" }, max_lines: 1, text: "còn cái nịt", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Trend TikTok",
                items: [
                    { overlay_id: "caption:co_tien_lam_phien_thien_ha", source: "remote", caption: { background: { colors: ["#0F0C29", "#302B63", "#F7971E", "#FFD200"] }, icon: { data: "💰", type: "emoji" }, max_lines: 1, text: "Có tiền làm phiền thiên hạ", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:hong_drama", source: "remote", caption: { background: { colors: ["#8A2387", "#E94057", "#F27121"] }, icon: { data: "🍿", type: "emoji" }, max_lines: 1, text: "Hóng drama", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:cuoi_vcl_m_oi", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200", "#FFEE58"] }, icon: { data: "😂", type: "emoji" }, max_lines: 1, text: "Cười vcl m oi", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:flex_den_hoi_tho_cuoi", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200"] }, icon: { data: "💎", type: "emoji" }, max_lines: 1, text: "Flex đến hơi thở cuối", text_color: "#000000E6", type: "static_content" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
