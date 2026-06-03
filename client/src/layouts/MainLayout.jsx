import Navbar from "../components/navbar/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default MainLayout;