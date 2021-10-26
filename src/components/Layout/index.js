import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 80px 120px;
  background-color: #E8E9ED;
`;

const Content = styled.div`
  min-height: calc(100vh - 160px);
  background-color: #ffffff;
  box-shadow: 0 0px 4px #ccc;
  border-radius: 12px;
  overflow: hidden;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
