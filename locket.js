// ============================================================
// LOCKET SERVER-LEVEL UNLOCKER (Dựa trên Raw Payload gốc)
// Fix 100%: AI Filter, Photobooth, 60s, Mic, Không lỗi UI
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // 1. GHI ĐÈ FEATURE GATES BẰNG CẤU TRÚC CHUẨN CỦA SERVER
    obj.entries["feature_gates"] = JSON.stringify({
        "app_icon_picker": "enabled",
        "camera_roll": "enabled",
        "camera_roll_video": "enabled",
        "video_upload": "enabled",
        "audio_recording": "enabled",     // Kích hoạt Mic
        "video_sound": "enabled",         // Kích hoạt Âm thanh
        "camera_theme": "enabled",
        "locket_views": "enabled",
        "long_captions": "enabled",
        "longer_video": "enabled",
        "longerVideo": "enabled",
        "video": "enabled",
        "unlimited_friends": "enabled",
        "priority_support": "subscriber", // Cờ chuẩn của Server
        "profile_badge": "subscriber",
        "profileBadge": "subscriber",
        "gold_badge": "subscriber",
        "goldBadge": "subscriber",
        "remove_ads": "subscriber",
        "custom_widget_frames": "enabled",
        "widget_frame": "enabled",
        "widget_frame_event": "enabled",
        "streak_recovery": "enabled",
        "ai_camera_filters": "enabled",   // Kích hoạt AI
        "photobooth": "enabled",          // Kích hoạt Photobooth
        "custom_camera_filters": "enabled",
        "live_photos": "enabled",
        "live_photos_capture": "enabled",
        "live_photos_viewing": "enabled"
    });

    // 2. CẤU HÌNH CAMERA 60S & MIC (Lấy chuẩn từ Server)
    obj.entries["gold_max_duration"] = "60.0";
    obj.entries["goldMaxDuration"] = "60.0";
    obj.entries["video_max_duration"] = "60.0";
    obj.entries["max_video_duration"] = "60.0";
    obj.entries["microphone_enabled"] = "true";
    obj.entries["camera_microphone_enabled"] = "true";
    obj.entries["video_sound_enabled"] = "true";

    obj.entries["camera"] = JSON.stringify({
        "gold_max_duration": 60, "goldMaxDuration": 60,
        "video_max_duration": 60, "videoMaxDuration": 60,
        "ultra_wide": true, "ultraWide": true,
        "volume_button": true, "volumeButton": true,
        "flash_button": true, "telephoto": true,
        "srgb": true, "quality_mbps": 1.2, "qualityMbps": 1.2,
        "filters": true, "effects": true, "microphone": true,
        "lanczos": true, "grid": true, "night_mode": true
    });

    obj.entries["camera_roll"] = JSON.stringify({
        "flash_button": true, "video_picker_enabled": true,
        "allows_video": true, "multi_select": true,
        "video_max_duration": 60, "videoMaxDuration": 60,
        "max_file_size_bytes": 52428800, "maxFileSizeBytes": 52428800
    });

    // 3. CẤU HÌNH AI FILTER & PHOTOBOOTH (Lấy chuẩn từ File bạn gửi)
    obj.entries["camera_filter_storage_bucket"] = "gs://locket-filters";
    obj.entries["camera_filter_fetch_cache_max_age_seconds"] = "0";
    obj.entries["camera_filter_custom_prompts_enabled"] = "true";
    obj.entries["ai_camera_filters_enabled"] = "true";
    obj.entries["custom_camera_filters_enabled"] = "true";

    // Bơm nguyên văn cấu trúc Filter AI chuẩn của Locket
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

    // 4. Bật các cờ VIP tổng (Dành cho Paywall)
    obj.entries["is_premium"] = "true";
    obj.entries["is_gold"] = "true";
    obj.entries["unlimited_max_friend_count"] = "9999";
}

$done({ body: JSON.stringify(obj) });
