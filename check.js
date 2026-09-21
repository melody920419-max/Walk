  (async function checkVPN() {
    // 1. 填入步驟一取得的 Cloudflare Worker 網址
    const WORKER_URL = "https://verifier.noah-wu.workers.dev/";

    try {
      const res = await fetch(WORKER_URL);
      const data = await res.json();

      // 2. 如果 Worker 回傳不允許，阻擋頁面
      if (!data.allowed) {
        document.addEventListener("DOMContentLoaded", () => {
          document.body.innerHTML = `
            <div style="
              display:flex; flex-direction:column; align-items:center; 
              justify-content:center; height:100vh; margin:0; 
              font-family:sans-serif; background:#f8f9fa; color:#333;
            ">
              <div style="background:white; padding:40px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
                <h1 style="color:#dc3545; margin-bottom:16px;">403 存取受限</h1>
                <p style="color:#6c757d;">本網站僅限連接公司 VPN 存取。</p>
              </div>
            </div>
          `;
        });
      }
    } catch (err) {
      console.error("IP 驗證失敗:", err);
    }
  })();
