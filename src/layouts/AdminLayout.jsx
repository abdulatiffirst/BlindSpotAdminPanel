import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthContext";
import { PAGES } from "@/config/materials";
import { theme as t } from "@/styles/theme";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
const Side = styled.aside`
  background: #2b2a2a;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h1 {
    color: #fff;
    font-size: 18px;
    margin: 0 0 16px;
  }
`;
const Nav = styled(NavLink)`
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  color: #fff;
  &.active {
    background: ${t.accent};
    color: ${t.ink};
  }
`;
const Content = styled.main`
  padding: 28px;
  overflow-x: auto;
`;

export default function AdminLayout() {
  const { logout } = useAuth();
  return (
    <Layout>
      <Side>
        <h1>Blind Spot admin</h1>
        {Object.entries(PAGES).map(([key, p]) => (
          <Nav key={key} to={`/materials/${key}`}>
            {p.label}
          </Nav>
        ))}
        <Button style={{ marginTop: "auto" }} onClick={logout}>
          Log out
        </Button>
      </Side>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
