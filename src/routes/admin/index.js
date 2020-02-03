import adminRoutes from './adminRoutes';

export default function ApiRoutes(app)
{
    app.use('/api/admin', adminRoutes);

}