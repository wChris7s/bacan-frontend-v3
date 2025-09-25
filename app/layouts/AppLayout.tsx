import { Outlet } from "react-router";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const cognitoAuthConfig: AuthProviderProps = {
  authority: "https://cognito-idp.sa-east-1.amazonaws.com/sa-east-1_159w2HKSs",
  client_id: "4mla5i9p487ostnt4gn3ddda8n",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid profile",
  extraQueryParams: {
    lang: "es",
  },
};

export default function AppLayout() {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <Outlet />;
    </AuthProvider>
  );
}
