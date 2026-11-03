// ============================================================
// Locket Remote Config - FULL FEATURES (AI, Photobooth, Filter, 45s)
// Fix: Lỗi bấm filter không ăn, thiếu Photobooth, thiếu Gen AI
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "FULL VIP: 45s + Mic + Photobooth + AI + Filter";
    obj.entries = obj.entries || {};

    // ============================================================
    // 1. KÍCH HOẠT TÍNH NĂNG (Bổ sung thay vì ghi đè)
    // ============================================================
    var currentGates = {};
    try {
        if (obj.entries.feature_gates) {
            currentGates = JSON.parse(obj.entries.feature_gates);
        }
    } catch(e) {}
    
    // Bổ sung các tính năng còn thiếu vào danh sách có sẵn
    var newGates = Object.assign(currentGates, {
        longer_video: "enabled",
        unlimited_friends: "enabled",
        remove_ads: "enabled",
        custom_widget_frames: "enabled",
        streak_recovery: "enabled",
        photobooth: "enabled",
        ai_filters: "enabled",
        gen_ai: "enabled",
        camera_filter: "enabled",
        video: "enabled"
    });
    obj.entries.feature_gates = JSON.stringify(newGates);
    
    // Bật cờ cho AI và Photobooth
    obj.entries.photobooth_enabled = "true";
    obj.entries.ai_filters_enabled = "true";
    obj.entries.gen_ai_enabled = "true";

    // ============================================================
    // 2. CAMERA, VIDEO, 45S & MIC
    // ============================================================
    var MY_VIDEO_DURATION = 45.0;
    var DURATION_STR = MY_VIDEO_DURATION.toString();
    
    var cameraConfig = {};
    try { if (obj.entries.camera) cameraConfig = JSON.parse(obj.entries.camera); } catch(e) {}
    Object.assign(cameraConfig, {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        maxDuration: MY_VIDEO_DURATION,
        enable_audio: true,
        microphone_enabled: true
    });
    obj.entries.camera = JSON.stringify(cameraConfig);

    var cameraRollConfig = {};
    try { if (obj.entries.camera_roll) cameraRollConfig = JSON.parse(obj.entries.camera_roll); } catch(e) {}
    Object.assign(cameraRollConfig, {
        gold_max_duration: MY_VIDEO_DURATION,
        goldMaxDuration: MY_VIDEO_DURATION,
        video_max_duration: MY_VIDEO_DURATION,
        max_duration: MY_VIDEO_DURATION,
        max_file_size: 104857600
    });
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    Object.assign(obj.entries, {
        max_video_duration: DURATION_STR,
        video_max_duration: DURATION_STR,
        camera_roll_max_duration: DURATION_STR,
        max_capture_duration: DURATION_STR,
        
        // Mic
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        record_audio: "true"
    });

    // ============================================================
    // 3. BỘ LỌC CAMERA (FIX LỖI BẤM KHÔNG ĂN)
    // ============================================================
    var filterConfig = {};
    try { if (obj.entries.camera_filter_config) filterConfig = JSON.parse(obj.entries.camera_filter_config); } catch(e) {}
    
    // Ghi đè cấu hình filter chuẩn
    Object.assign(filterConfig, {
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: true
    });
    
    // Chỉ thêm list filter nếu chưa có
    if (!filterConfig.sheet_filters) {
        filterConfig.sheet_filters = [
            { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
            { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
            { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
            { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
            { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
            { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
        ];
    }
    obj.entries.camera_filter_config = JSON.stringify(filterConfig);
    obj.entries.camera_filter_enabled = "true";
    obj.entries.camera_filters_enabled = "true";

    // ============================================================
    // 4. PHOTOBOOTH (KHẮC PHỤC LỖI MẤT KHUNG TỪ BẢN CŨ)
    // ============================================================
    // Tuyệt đối không gán widget_frames_config giả, để Locket tự tải từ server
    delete obj.entries.widget_frames_config; 
    
    Object.assign(obj.entries, {
        photobooth_enabled: "true",
        photobooth_frames_enabled: "true",
        photobooth_frame_picker_enabled: "true",
        photobooth_show_frame_picker: "true",
        custom_widget_frames_enabled: "true"
    });

    // ============================================================
    // 5. BẠN BÈ, MOMENTS, THÔNG BÁO (Lấy từ bản chạy tốt)
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999",
        hide_friends_enabled: "true",
        moment_views_enabled: "true",
        record_moment_views: "true",
        chat_reactions_enabled: "true",
        typing_indicators_enabled: "true",
        widget_frame_event_max_images: "10",
        live_activity_onboarding: "true",
        custom_profile_pics: "true"
    });

    // ============================================================
    // 6. CAPTION TIẾNG VIỆT & OVERLAY (Giữ nguyên bộ của bạn)
    // ============================================================
    Object.assign(obj.entries, {
        overlay_navigator_enabled: "true",
        captions_enabled: "true",
        music_caption_enabled: "true",
        link_caption_link_enabled: "true",
        overlay_dynamic_captions: JSON.stringify([
            "standard", "poll", "color_palette", "review", "music", "location",
            "weather", "time", "streak", "star_sign", "party_time", "locket_count",
            "good_morning", "goodnight", "ootd", "miss_you", "custom"
        ]),
        // Rút gọn bộ overlay để tránh bị quá tải payload (Payload Too Large)
        // Bạn có thể thêm lại các section khác nếu thấy cần
        overlay_items: JSON.stringify([
            {
                section: "🎨 Decorative by Locket",
                items: [
                    { overlay_id: "caption:party_time", source: "remote", caption: { background: { colors: ["#5EFFF5", "#FCFF57"] }, icon: { data: "🪩", type: "emoji" }, max_lines: 1, text: "Party Time!", text_color: "#000000E6", type: "static_content" } },
                    { overlay_id: "caption:good_morning", source: "remote", daily_start_hour: 5, daily_end_hour: 10, caption: { background: { colors: ["#EF7402", "#EABF0F"] }, icon: { data: "☀️", type: "emoji" }, max_lines: 1, text: "Good morning", text_color: "#FFFFFFE5", type: "static_content" } },
                    { overlay_id: "caption:goodnight", source: "remote", daily_start_hour: 19.5, daily_end_hour: 24, caption: { background: { colors: ["#370C6F", "#575CD4"] }, icon: { data: "🌙", type: "emoji" }, max_lines: 1, text: "Goodnight", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            },
            {
                section: "🎨 Độc lạ",
                items: [
                    { overlay_id: "caption:xin_vinh_biet_cu", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Xin vĩnh biệt cụ", text_color: "#FFFFFFE6", type: "static_content" } },
                    { overlay_id: "caption:chay_ngay_di", source: "remote", caption: { background: { colors: ["#D31027", "#EA384D"] }, icon: { data: "🏃💨", type: "emoji" }, max_lines: 1, text: "Chạy ngay đi", text_color: "#FFFFFFE6", type: "static_content" } }
                ]
            }
        ])
    });
}

$done({ body: JSON.stringify(obj) });
