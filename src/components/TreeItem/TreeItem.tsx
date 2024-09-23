import React from 'react';

interface TreeItemProps {
    name: string;
    indentation: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ name, indentation }) => {
    return (
        <div style={{ paddingLeft: `${indentation * 20}px` }}>
            {name}
        </div>
    );
};

export default TreeItem;
