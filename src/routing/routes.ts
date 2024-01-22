const baseUrl = import.meta.env.BASE_URL;

const root = '/';
const home = '/';
const users = '/users';
const contact = '/contact';
const userDetail = (userId: number | ':id') => `${users}/${userId}`;

export const routes = {
	baseUrl,
	root,
	home,
	users,
	contact,
	userDetail,
};
