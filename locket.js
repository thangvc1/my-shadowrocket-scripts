// ============================================================
// LOCKET ULTIMATE UNLOCKER (Deep-Force JSON Patching)
// Kết hợp 45s/Mic và thuật toán quét mở khóa AI/Filter từ V6
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

// Hàm đệ quy quét toàn bộ JSON để bẻ khóa AI và Filter
function deepForceUnlock(node) {
    if (!node || typeof node !== "object") return node;

    if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
            deepForceUnlock(node[i]);
        }
        return node;
    }

    // Quét qua từng key trong object
    for (const key of Object.keys(node)) {
        const lowKey = key.toLowerCase();
        const val = node[key];

        // 1. Ép số lượt AI thành 999999
        if (lowKey.includes("ai_filter_quota") || lowKey.includes("ai_filter_remaining") || lowKey.includes("remaining_uses") || lowKey.includes("ai_credits")) {
            if (typeof val === "number" || typeof val === "string") {
                node[key] = 999999;
            }
        }
        
        // 2. Bẻ khóa các cờ khóa Filter/AI/Photobooth
        else if (lowKey.includes("gold_only") || lowKey.includes("require_gold") || lowKey.includes("is_locked") || lowKey.includes("paywall") || lowKey.includes("blur") || lowKey === "locked") {
            if (typeof val === "boolean") node[key] = false;
            else if (typeof val === "string" && (val === "true" || val === "1")) node[key] = "false";
        }

        // 3. Bật các cờ cho phép sử dụng
        else if (lowKey.includes("is_gold") || lowKey.includes("has_gold") || lowKey.includes("is_unlocked") || lowKey.includes("can_use")) {
            if (typeof val === "boolean") node[key] = true;
            else if (typeof val === "string" && (val === "false" || val === "0")) node[key] = "true";
        }

        // Đệ quy đi sâu vào bên trong
        if (typeof val === "object" && val !== null) {
            deepForceUnlock(val);
        }
    }
    return node;
}

if (ua.includes("Locket")) {
    obj.entries = obj.entries || {};

    // 1. Kích hoạt VIP cấp gốc
    Object.assign(obj.entries, {
        is_premium: "true",
        is_gold: "true",
        premium: "true",
        bypass_gold_paywall: "true",
        unlock_all_effects: "true",
        ai_filter_quota: "999999"
    });

    // 2. Ghi đè Feature Gates
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

    // 3. Khôi phục cấu hình 45s & Mic
    var DUR = 45.0;
    obj.entries.camera = JSON.stringify({
        gold_max_duration: DUR, goldMaxDuration: DUR,
        max_duration: DUR, maxDuration: DUR,
        ultra_wide: true, telephoto: true,
        enable_audio: true, microphone_enabled: true
    });
    obj.entries.camera_roll = JSON.stringify({
        gold_max_duration: DUR, goldMaxDuration: DUR,
        video_max_duration: DUR, videoMaxDuration: DUR,
        max_duration: DUR, maxDuration: DUR
    });
    
    var durStr = DUR.toString();
    Object.assign(obj.entries, {
        max_video_duration: durStr, video_max_duration: durStr,
        video_sound_enabled: "true", microphone_enabled: "true", camera_microphone_enabled: "true"
    });

    // 4. Xóa bỏ các cấu hình tĩnh gây lỗi UI từ các bản trước
    delete obj.entries.camera_filter_config;
    delete obj.entries.widget_frames_config;

    // 5. CHẠY HÀM QUÉT SÂU ĐỂ BẺ KHÓA TOÀN BỘ CỜ ẨN
    obj = deepForceUnlock(obj);
}

$done({ body: JSON.stringify(obj) });
