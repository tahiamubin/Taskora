import { Dashboard } from '@/src/components/Dashboard';
import React, { ReactNode } from 'react';

const DashboardLayout = ({children} : {children : ReactNode}) => {
    return (
        <div>
            <Dashboard >{children}</Dashboard>
        </div>
    );
};

export default DashboardLayout;