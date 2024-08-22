import FingerprintJSPro from "@fingerprintjs/fingerprintjs-pro";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

/**
 * 获取浏览器指纹的函数-收费
 * @returns 浏览器指纹（visitorId）
 */
export const getBrowserFingerprintPro = async (): Promise<string> => {
  // Initialize the agent
  const fpPromise = FingerprintJSPro.load({
    apiKey: "your-public-api-key",
  });

  // Get the visitor identifier
  const fp = await fpPromise;
  const result = await fp.get();

  // 返回浏览器指纹
  return result.visitorId;
};

/**
 * 获取浏览器指纹的函数-免费
 * @returns 浏览器指纹（visitorId）
 */
export const getBrowserFingerprint = async (): Promise<string> => {
  // Initialize the agent
  const fpPromise = FingerprintJS.load();

  // Get the visitor identifier
  const fp = await fpPromise;
  const result = await fp.get();

  // 返回浏览器指纹
  return result.visitorId;
};
