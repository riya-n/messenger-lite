import s from 'styled-components';

export const Page = s.div`
  margin: 1rem 4rem;
  font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif;
  top: 30%;
  position: absolute;
`;

export const MainPage = s.div`
  margin: 1rem 1rem;
  font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif;
  height: 100%;
  display: flex;
`;

export const LeftPanel = s.div`
  padding: 1rem 1rem;
  border-right: 1px solid rgb(40, 48, 51, 0.2);
  width: 30%;
  height: -webkit-fill-available;
  display: flex;
  flex-flow: column;
`;

export const RightPanel = s.div`
  padding: 1rem 1rem;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  display: flex;
  flex-flow: column;
`;

export const Logo = s.img`
  margin: 2rem 2rem;
  height: 50px;
  width: 50px;
`;

export const LinkWrapper = s.span`
 margin-left: 20px;
`;

export const ErrorMessage = s.div`
  color: #f03d25;
`;

export const InputBox = s.input`
  background: rgba(0, 0, 0, .04);
  border: none;
  border-radius: 10px;
  color: rgba(0, 0, 0, 1);
  display: block;
  height: 36px;
  margin-bottom: 12px;
  padding: 8px 16px;
  width: 100%;
  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline-width: 0px;
    border: 0.1px solid #0084ff;
  }
`;

const Button = s.button`
  cursor: pointer;
  background-color: #0084ff;
  border: 1px solid #0084ff;
  color: #fff;
  height: 40px;
  line-height: 19px;
  margin-bottom: 12px;
  border-radius: 20px;
  &:hover {
    background-color: #5218fa;
  }
  &:focus {
    outline-width: 0px;
  }
  &:active {
    opacity: 0.3;
  }
`;

export const ActionButton = s(Button)`
  width: 100%;
  max-width: 400px;
`;

export const SendButton = s(Button)`
  padding: 0rem 1rem;
  margin-left: 1rem;
`;

export const Title = s.h1`
  background: linear-gradient(81.84deg, #0099ff -9.4%, #a033ff 51.57%, #ff5280 84.07%, #ff7061 90.59%);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 60px;
  font-weight: 450;
  letter-spacing: -2px;
  padding: 0 0 8px;
`;

export const Subtitle = s.h3`
  color: #595959;
  margin: 0 0 38px;
  font-size: 20px;
  font-weight: 400;
`;

export const ChatName = s(Subtitle)`
  border-bottom: 1px solid rgb(40, 48, 51, 0.2);
  padding-bottom: 1rem;
  margin: 0 0 1rem;
`;

export const List = s.div`
  display: block;
  margin-bottom: 1rem;
  overflow-y: scroll;
  height: -webkit-fill-available;
`;

export const SearchElement = s.div`
  display: block;
  color: #1c1e21;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 10px;
  overflow: scroll;
  padding: 8px 16px;
  margin: 0.5rem 0rem;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, .02);
  }
`;

export const ChatElement = s(SearchElement)`
  font-size: 18px;
`;

export const CurrChatElement = s(ChatElement)`
  background-color: rgba(0, 0, 0, .04);
`;

export const MyMsg = s(SearchElement)`
  border-radius: 20px;
  background-color: #0084ff;
  color: white;
  float: right;
  cursor: default;
  margin: 2px;
  max-width: 400px;
  word-wrap:break-word;
  &:hover {
    background-color: #0084ff;
  }
`;

export const OtherMsg = s(SearchElement)`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, .04);
  float: left;
  cursor: default;
  margin: 2px;
  max-width: 400px;
  word-wrap:break-word;
  &:hover {
    background-color: rgba(0, 0, 0, .04);
  }
`;

export const SendMsgWrapper = s.div`
  display: flex;
  position: sticky;
  bottom: 1rem;
  width: -webkit-fill-available;
  padding-top: 1rem;
`;

export const Break = s.div`
  clear: both;
`;
