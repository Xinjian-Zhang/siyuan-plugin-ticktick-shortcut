import {
  Plugin,
  showMessage,
  getFrontend,
} from "siyuan";

const TICKTICK_PROTOCOL = "ticktick:";

export default class TickTickShortcutPlugin extends Plugin {
  private isMobile: boolean;

  onload() {
      // 1. 注册图标
      this.addIcons(`
          <symbol id="iconTickTick" viewBox="0 0 48 48">
              <linearGradient id="ticktick-gradient-a" x1="-255.008" x2="-225.443" y1="81.828" y2="111.393" gradientTransform="translate(263.077 -69.618)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#3097ef"/>
                  <stop offset="1" stop-color="#0a73d9"/>
              </linearGradient>
              <path fill="url(#ticktick-gradient-a)" d="M3.991,23.999c0-11.044,8.964-20.009,20.009-20.009v5	c-8.284,0-15.009,6.727-15.009,15.009c0,8.284,6.725,15.009,15.009,15.009c8.283,0,15.009-6.725,15.009-15.009h5	c0,11.045-8.965,20.009-20.009,20.009C12.955,44.009,3.991,35.045,3.991,23.999z"/>
              <linearGradient id="ticktick-gradient-b" x1="-240.648" x2="-240.648" y1="76.72" y2="113.665" gradientTransform="translate(268.229 -67.843)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#fed100"/>
                  <stop offset="1" stop-color="#e36001"/>
              </linearGradient>
              <path fill="url(#ticktick-gradient-b)" d="M22.662,29.425l-7.796-6.381l3.167-3.868l5.848,4.787	L36.403,8.439l3.892,3.14L26.191,29.061C25.321,30.139,23.735,30.303,22.662,29.425z"/>
          </symbol>
      `);

      // 2. 设备类型判断（可选）
      const frontEnd = getFrontend();
      this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

      // 3. 顶栏按钮
      this.addTopBar({
          icon: "iconTickTick",
          title: this.i18n.openTickTick ?? "Open TickTick",
          position: "right", // 保持与模板一致
          callback: () => {
              try {
                  window.open(TICKTICK_PROTOCOL, "_blank");
              } catch (e) {
                  showMessage("无法唤起 TickTick，可能未安装客户端");
              }
          },
      });

      // 可以添加 statusBar、setting、命令等扩展（按需加）
  }

  onunload() {
      // 可以加日志，方便调试
      console.log(`[TickTickShortcutPlugin] Unloaded`);
  }
}
