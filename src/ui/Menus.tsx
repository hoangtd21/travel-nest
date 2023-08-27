import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{
  position: PositionI;
}>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface PositionI {
  x: number | null;
  y: number | null;
}

interface MenusContextI {
  openId: string | undefined;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  position: PositionI;
  setPosition: (value: React.SetStateAction<PositionI>) => void;
}

const MenusContext = createContext<MenusContextI>({
  openId: '',
  close: () => {},
  open: () => {},
  position: { x: null, y: null },
  setPosition: () => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<PositionI>({ x: null, y: null });

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.target as Element)
      .closest('button')
      ?.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - Number(rect?.width) - Number(rect?.x),
      y: Number(rect?.y) + Number(rect?.height) + 8,
    });

    return openId === '' || openId !== String(id) ? open(String(id)) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== String(id)) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactElement;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext);
  const handleClickBtn = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClickBtn}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
