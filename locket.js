var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // 1. Kích hoạt cờ VIP (Không chèn Filter/Khung ảo)
    obj.entries.is_premium = "true";
    obj.entries.is_gold = "true";
    obj.entries.premium = "true";

    // 2. Mở khóa tính năng
    var gates = {};
    try { if (obj.entries.feature_gates) gates = JSON.parse(obj.entries.feature_gates); } catch(e) {}
    Object.assign(gates, {
        longer_video: "enabled",
        custom_widget_frames: "enabled",
        photobooth: "enabled",
        ai_filters: "enabled",
        gen_ai: "enabled",
        camera_filter: "enabled"
    });
    obj.entries.feature_gates = JSON.stringify(gates);

    // 3. Cấu hình 45s & Mic
    obj.entries.max_video_duration = "45.0";
    obj.entries.video_max_duration = "45.0";
    obj.entries.video_sound_enabled = "true";
    obj.entries.microphone_enabled = "true";
    obj.entries.camera_microphone_enabled = "true";

    var cam = {};
    try { if (obj.entries.camera) cam = JSON.parse(obj.entries.camera); } catch(e) {}
    Object.assign(cam, { gold_max_duration: 45.0, max_duration: 45.0, enable_audio: true });
    obj.entries.camera = JSON.stringify(cam);
}

$done({ body: JSON.stringify(obj) });
