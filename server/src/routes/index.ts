import { Router } from 'express';
import books from './books';
import auth from './auth';

export default () => {
	const app = Router();
	books(app);
	auth(app);

	return app
}