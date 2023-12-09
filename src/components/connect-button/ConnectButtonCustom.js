import { ConnectButton } from "@rainbow-me/rainbowkit";
const ConnectButtonCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    style={{
                      padding: "10px 30px",
                      background: "#b0f127",
                      color: "#060606",
                      fontSize: "15px",
                      border: "#b0f127",
                      borderRadius: "10px",
                      transformStyle: "preserve-3d",
                      width: "100%",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#b0f127",
                      color: "#060606",
                      fontSize: "15px",
                      border: "#b0f127",
                      borderRadius: "48px",
                      padding: "10px 30px ",
                      borderRadius: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      padding: "10px 30px ",
                      background: "#b0f127",
                      color: "#060606",
                      border: "#b0f127",
                      borderRadius: "10px",
                      fontSize: "15px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default ConnectButtonCustom;
