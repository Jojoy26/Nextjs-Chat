import styled, { keyframes, css } from 'styled-components';

import { AiOutlineSend } from 'react-icons/ai';

const FadeInAnimation = keyframes`

	from {
		opacity: 0;
		transform: translate(100px); 
	}
	to {
		opacity: 1;
		transform: translate(0px);
	}
`;

export const Container = styled.div`
	width: max(70vw, 400px);
	border: 1px solid #ccc;
	height: max(80vh - 20px, 400px);
	box-sizing: border-box;

	background: #ddd;

	display: flex;
	flex-direction: column;
`;

export const MessageContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
	overflow-y: scroll;

	overflow-x: hidden;

	padding: 20px 20px 0 20px;
	flex: 1;
`;

type MessageProps = {
	isMine: boolean
	hasAnimation: boolean
}

const FadeInAnimationCss = css`
	animation-duration: 0.3s;
	animation-name: ${FadeInAnimation};
`;

export const MessageItem = styled.div<MessageProps>`
	${props => props.hasAnimation ? FadeInAnimationCss : ''}
  background: ${props => props.isMine ? '#DCD042' : '#fff'};
	border-radius: 10px;
	width: fit-content;
  max-width: 70%;

	position: relative;
  color: #000;

	padding: 15px;
	margin-bottom: 20px;

	align-self: ${props => props.isMine ? 'flex-end' : 'flex-start'};

	&:after {
		content: "";

		width: 0;
		height: 0;

		position: absolute;

		${props => props.isMine ? 
			'border-right: 30px solid transparent' : 
			'border-left: 30px solid transparent'};
		border-top: 30px solid ${props => props.isMine ? '#DCD042' : '#fff'};
		
		top: 0px;
		right: ${props => props.isMine ? '-15px' : 'unset'};
		left: ${props => !props.isMine ? '-15px' : 'unset'};
	}
`;

export const InputContainer = styled.div`
	padding: 0 10px 10px 10px;
	display: flex;
	flex-direction: row;
	align-items: center;

	position: relative;
`;

export const Input = styled.input`
	height: 40px;
	width: 100%;
	padding: 5px 10px;

	font-size: 18px;

	border: 1px solid #ccc;
	position: relative;

	&:focus {
		outline: none;
	}
`;

export const ContainerButton = styled.div`
	padding: 10px 15px;

	cursor: pointer;

	&:hover > * {
		color: green;
	}
`

export const SendButton = styled(AiOutlineSend)`
	transition: .3s;
	color: #000;
`;

