// ============================================================
// LOCKET FIXED - SERVER PAYLOAD EXACT MATCH (45s + Mic + AI + Filter)
// ============================================================
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};
    var DUR = 45.0;

    // 1. CẤU HÌNH CAMERA (Lấy chuẩn từ bản chạy tốt của bạn, không dùng 60s)
    var cameraConfig = {
        gold_max_duration: DUR, goldMaxDuration: DUR,
        max_duration: DUR, maxDuration: DUR,
        ultra_wide: true, ultraWide: true, volume_button: true, volumeButton: true,
        flash_button: true, telephoto: true, srgb: true, lanczos: true,
        quality_mbps: 0.6, qualityMbps: 0.6,
        filters: true, effects: true, microphone: true
    };
    var cameraRollConfig = {
        gold_max_duration: DUR, goldMaxDuration: DUR,
        video_max_duration: DUR, videoMaxDuration: DUR,
        max_duration: DUR, maxDuration: DUR, trim_max_duration: DUR, trimMaxDuration: DUR,
        camera_roll_max_duration: DUR, camera_roll_video_max_duration: DUR,
        max_file_size: 104857600, max_upload_bytes: 104857600, max_size_bytes: 104857600,
        quality_mbps: 0.6, qualityMbps: 0.6, flash_button: true
    };

    obj.entries.camera = JSON.stringify(cameraConfig);
    obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

    // 2. CẤU HÌNH ÂM THANH & THỜI LƯỢNG
    var durStr = DUR.toString();
    Object.assign(obj.entries, {
        max_video_duration: durStr,
        video_max_duration: durStr,
        gold_max_duration: durStr,
        goldMaxDuration: durStr,
        camera_roll_max_duration: durStr,
        camera_microphone_enabled: "true",
        microphone_enabled: "true",
        video_sound_enabled: "true",
        is_premium: "true",
        is_gold: "true"
    });

    // 3. FEATURE GATES (Sử dụng chính xác từ khóa "enabled" và "subscriber" từ Server)
    var gates = {};
    try { if (obj.entries.feature_gates) gates = JSON.parse(obj.entries.feature_gates); } catch(e) {}
    Object.assign(gates, {
        "app_icon_picker": "enabled", "camera_roll": "enabled", "camera_roll_video": "enabled",
        "video_upload": "enabled", "audio_recording": "enabled", "video_sound": "enabled",
        "camera_theme": "enabled", "locket_views": "enabled", "long_captions": "enabled",
        "longer_video": "enabled", "longerVideo": "enabled", "video": "enabled",
        "unlimited_friends": "enabled", "priority_support": "subscriber", "profile_badge": "subscriber",
        "profileBadge": "subscriber", "gold_badge": "subscriber", "goldBadge": "subscriber",
        "remove_ads": "subscriber", "custom_widget_frames": "enabled", "widget_frame": "enabled",
        "widget_frame_event": "enabled", "streak_recovery": "enabled", "music_caption": "enabled",
        "reactions_v2": "enabled", "send_to_self": "enabled", "audience_selection": "enabled",
        "private_post": "enabled", "link_caption": "enabled", "video_reactions": "enabled",
        "star_signs": "enabled", "custom_fonts": "enabled", "camera_ultra_wide": "enabled",
        "voice_notes": "enabled", "hd_moments": "enabled", "live_photos": "enabled",
        "live_photo": "enabled", "live_photos_capture": "enabled", "live_photos_viewing": "enabled",
        "gold_camera_themes": "enabled", "ai_camera_filters": "enabled", "photobooth": "enabled"
    });
    obj.entries.feature_gates = JSON.stringify(gates);

    // 4. CẤU HÌNH AI FILTER & PHOTOBOOTH (Bơm chuẩn xác từ Payload Server)
    obj.entries["camera_filter_storage_bucket"] = "gs://locket-filters";
    obj.entries["camera_filter_fetch_cache_max_age_seconds"] = "0";
    obj.entries["camera_filter_custom_prompts_enabled"] = "true";
    obj.entries["ai_camera_filters_enabled"] = "true";
    obj.entries["custom_camera_filters_enabled"] = "true";

    obj.entries["camera_filter_config"] = JSON.stringify({
        "showFilterButton": true, "sheetEnabled": true, "allowsCustomFilters": true,
        "referenceImageAttachmentEnabled": true, "customPromptEnabled": true,
        "aiFiltersEnabled": true, "textToFilterEnabled": true, "promptCharacterLimit": 500,
        "allows_custom_filters": true, "show_filter_button": true, "sheet_enabled": true,
        "pickerFilters": ["filter_looksmaxing", "filter_anime_pastel", "filter_vintage_film", "filter_cyberpunk_neon", "filter_golden_hour", "filter_cutesy_capybara", "filter_cutout_giraffe", "filter_fireworks", "filter_cutout_sweat_hearts", "filter_tuxedo"],
        "picker_filters": ["filter_looksmaxing", "filter_anime_pastel", "filter_vintage_film", "filter_cyberpunk_neon", "filter_golden_hour", "filter_cutesy_capybara", "filter_cutout_giraffe", "filter_fireworks", "filter_cutout_sweat_hearts", "filter_tuxedo"],
        "filters": [
            {"uid": "filter_looksmaxing", "name": "Looksmaxxing ✨", "prompt": "Apply subtle facial enhancement, glowing skin, defined jawline and cinematic natural lighting", "particleEffect": "sparkle"},
            {"uid": "filter_anime_pastel", "name": "Anime Pastel 🌸", "prompt": "Transform scene into soft Makoto Shinkai anime aesthetic, pastel tones, cherry blossom petals", "particleEffect": "petals"},
            {"uid": "filter_vintage_film", "name": "Film 1998 🎞️", "prompt": "Kodak Portra 400 film grain, warm nostalgic tones, slight light leak, analog photo", "particleEffect": "dust"},
            {"uid": "filter_cyberpunk_neon", "name": "Cyberpunk Neon ⚡", "prompt": "Futuristic neon glow, cyberpunk cyan and magenta ambient lighting, high tech aesthetic", "particleEffect": "rain"},
            {"uid": "filter_golden_hour", "name": "Golden Glow 🌅", "prompt": "Warm golden hour sunlight, sun flare, dreamy soft bokeh, cinematic portrait", "particleEffect": "light_leak"},
            {"uid": "filter_cutesy_capybara", "name": "Capybara & Thỏ 🐾", "prompt": "Cute floating kawaii capybara with orange and fluffy bunny beside, pastel aesthetic", "particleEffect": "hearts"},
            {"uid": "filter_cutout_giraffe", "name": "Hươu cao cổ 🦒", "prompt": "Replace subject clothing with a fun giraffe costume suit", "particleEffect": "leaves"},
            {"uid": "filter_fireworks", "name": "Pháo hoa đêm 🎆", "prompt": "Fill the background sky with colorful bursting celebration fireworks", "particleEffect": "fireworks"},
            {"uid": "filter_cutout_sweat_hearts", "name": "Kẹo trái tim 💖", "prompt": "Show subject holding a big sweet pastel candy heart with lovely sparkles", "particleEffect": "hearts"},
            {"uid": "filter_tuxedo", "name": "Áo Vest Tuxedo 🎩", "prompt": "Show subject wearing an ultra-luxurious tailored black tuxedo with bow tie", "particleEffect": "stars"}
        ],
        "sheetFilters": [
            {"title": "✨ AI Tạo Kiểu Mới", "filters": [
                {"uid": "filter_looksmaxing", "name": "Looksmaxxing ✨", "prompt": "Apply subtle facial enhancement, glowing skin, defined jawline and cinematic natural lighting", "particleEffect": "sparkle"},
                {"uid": "filter_anime_pastel", "name": "Anime Pastel 🌸", "prompt": "Transform scene into soft Makoto Shinkai anime aesthetic, pastel tones, cherry blossom petals", "particleEffect": "petals"},
                {"uid": "filter_vintage_film", "name": "Film 1998 🎞️", "prompt": "Kodak Portra 400 film grain, warm nostalgic tones, slight light leak, analog photo", "particleEffect": "dust"},
                {"uid": "filter_cyberpunk_neon", "name": "Cyberpunk Neon ⚡", "prompt": "Futuristic neon glow, cyberpunk cyan and magenta ambient lighting, high tech aesthetic", "particleEffect": "rain"},
                {"uid": "filter_golden_hour", "name": "Golden Glow 🌅", "prompt": "Warm golden hour sunlight, sun flare, dreamy soft bokeh, cinematic portrait", "particleEffect": "light_leak"},
                {"uid": "filter_cutesy_capybara", "name": "Capybara & Thỏ 🐾", "prompt": "Cute floating kawaii capybara with orange and fluffy bunny beside, pastel aesthetic", "particleEffect": "hearts"}
            ]},
            {"title": "🎭 Trang Phục & Lễ Hội", "filters": [
                {"uid": "filter_cutout_giraffe", "name": "Hươu cao cổ 🦒", "prompt": "Replace subject clothing with a fun giraffe costume suit", "particleEffect": "leaves"},
                {"uid": "filter_fireworks", "name": "Pháo hoa đêm 🎆", "prompt": "Fill the background sky with colorful bursting celebration fireworks", "particleEffect": "fireworks"},
                {"uid": "filter_cutout_sweat_hearts", "name": "Kẹo trái tim 💖", "prompt": "Show subject holding a big sweet pastel candy heart with lovely sparkles", "particleEffect": "hearts"},
                {"uid": "filter_tuxedo", "name": "Áo Vest Tuxedo 🎩", "prompt": "Show subject wearing an ultra-luxurious tailored black tuxedo with bow tie", "particleEffect": "stars"}
            ]}
        ]
    });
}

$done({ body: JSON.stringify(obj) });
