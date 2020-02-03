import adminRoutes from './adminRoutes';
import businessRoutes from './businessRoutes';
import categoryRoutes from './categoryRoutes';

export default function ApiRoutes(app)
{
    app.use('/api/admin', adminRoutes);
    app.use('/api/business', businessRoutes);
    app.use('/api/category', categoryRoutes);
}