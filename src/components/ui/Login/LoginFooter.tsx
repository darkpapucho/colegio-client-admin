import styled from 'styled-components';
import { AiOutlineWhatsApp, AiOutlineMail } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import logo from '/logo.png';
import { Image } from '../../shared/Image';
import { Icon } from '../../shared/Icon';
const SLoginFooter = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  background-color: ${({ theme }) => theme.colors.secondary[800]};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 1rem 0 1rem;

  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    flex-direction: row;
  }
`;
const FooterItem = styled.li`
  list-style: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;
const FooterLogo = styled.div`
  width: 5.2rem;
  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    width: 10rem;
  }
`;
export default function LoginFooter() {
  return (
    <SLoginFooter>
      <ul>
        <FooterItem>
          <Icon $primary $small>
            <AiOutlineWhatsApp />
          </Icon>
          925355517
        </FooterItem>
        <FooterItem>
          <Icon $primary $small>
            <AiOutlineMail />
          </Icon>
          jasusnazarenocolegio@gmail.com
        </FooterItem>
        <FooterItem>
          <Icon $primary $small>
            <IoLocationOutline />
          </Icon>
          Calle Coronel Portillo Mz 43 Lt 3 Asociación Popular Lomas de Ancón
        </FooterItem>
      </ul>
      <FooterLogo>
        <Image $width="100%" $ratio="2 / 3" src={logo}></Image>
      </FooterLogo>
    </SLoginFooter>
  );
}
