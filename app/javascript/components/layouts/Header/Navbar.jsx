import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import { Typography, Breadcrumb, Button } from "antd";
import { Layout, Menu, theme } from "antd";
import { siteInfo, navigations } from "../../../utils/content";
import { useAuth } from "../../../hooks/useAuth";

const NavbarSection = () => {
  const { logoutAction } = useAuth();
  const { Title } = Typography;
  const { Header } = Layout;

  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
    const { label } = flattenNavigations.find((item) => item.key === current) || {};
    setTitle(label);
  }, [current]);

  const onMenuClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    const flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
    const { label } = flattenNavigations.find((item) => item.key === current) || {};
    setTitle(label);
  }, [current]);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "right",
          backgroundColor: "#000",
          position: "fixed",
          width: "100%",
          zIndex: "10",
        }}
      >
        <div className="demo-logo " style={{ marginRight: "100px" }}>
          <Title level={4} style={{ marginTop: 15 }}>
            <Link to="home">{siteInfo.title}</Link>
          </Title>
        </div>
        <Menu
          onClick={onMenuClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={navigations}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#000",
            color: "#fff",
          }}
        />
        <Button onClick={logoutAction} style={{ marginLeft: "300px", marginTop: "15px" }}>
          <Link to="/signin">LogOut</Link>
        </Button>
      </Header>
      <Breadcrumb
        items={[
          { title },
        ]}
        style={{ padding: "10px 50px ", backgroundColor: "grey", marginTop: "55px" }}
      />
    </Layout>
  );
};

export default NavbarSection;