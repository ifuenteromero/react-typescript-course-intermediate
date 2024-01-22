import { ReactNode } from 'react';
import { NavLinkProps, NavLink as RRDNavLink } from 'react-router-dom';

interface Props extends NavLinkProps {
	children: ReactNode;
}

const NavLink = ({ children, ...restProps }: Props) => {
	return (
		<RRDNavLink
			className={({ isActive }) =>
				`nav-link${isActive ? ' active-link' : ''}`
			}
			{...restProps}
		>
			{children}
		</RRDNavLink>
	);
};

export default NavLink;
