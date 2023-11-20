import styled from 'styled-components';
import { FaXTwitter } from 'react-icons/fa6';
import { GrInstagram } from 'react-icons/gr';
import { SiLinkedin } from 'react-icons/si';

function HomePage() {
  return (
    <div className="background">
      <div className="height">
        <Container>
          <div className="website-heading">
            <h2 className="primary-heading padding-top">
              Your go-to resource for
            </h2>
            <h2 className="primary-heading">
              exploring and practicing the essentials of
            </h2>
            <h2 className="primary-heading margin">
              {' '}
              <span className="heading-decorate">Aptitude</span> and{' '}
              <span className="heading-decorate">Data Structures</span>
            </h2>
          </div>
          <Footer>
            <div className="about-us">
              <SiLinkedin className="social-icons" />
              <FaXTwitter className="social-icons" />
              <GrInstagram className="social-icons" />
              <p className="name">@Ganesh Margale</p>
            </div>
            <div className="copyright">&copy; All rights reserved</div>
            <div className="about-us">
              <SiLinkedin className="social-icons" />
              <FaXTwitter className="social-icons" />
              <GrInstagram className="social-icons" />
              <p className="name">@Akash Mathad</p>
              <div className="gradient-circle bottom"></div>
            </div>
          </Footer>
        </Container>
      </div>
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .website-heading {
    margin-top: -10rem;
  }

  .primary-heading {
    padding: 0 12.8rem;
    font-size: 6.4rem;
    text-align: center;
    font-weight: 500;
    letter-spacing: -1.5px;
    line-height: 1.2;
  }

  .heading-decorate {
    background-color: ${(props) => props.theme.colors.colorPrimary};
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px 8px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .margin {
    margin-top: 1.2rem;
  }
`;

const Footer = styled.div`
  width: 135rem;
  margin: 0 auto;
  height: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;

  .about-us {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
  }

  .social-icons {
    cursor: pointer;
    font-size: 2.4rem;
    color: ${(props) => props.theme.colors.colorPrimaryLight};
  }

  .name {
    font-size: ${(props) => props.theme.fontSizes.small};
  }

  .copyright {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export default HomePage;
