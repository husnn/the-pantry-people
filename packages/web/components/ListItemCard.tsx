import { Card } from '@mui/material';

type ListItemCardProps = {
  firstName: string;
  lastName: string;
  items: string;
};

export const listItemCard = ({
  firstName,
  lastName,
  items
}: ListItemCardProps) => {
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 250, my: 5, minHeight: 300 }}>
        hellos
      </Card>
    </div>
  );
};

export default ListItemCardProps;
