import { Button, Card, CardContent } from '@mui/material';

type ListItemCardProps = {
  firstName: string;
  lastName: string;
  items: string;
};

export const ListItemCard = ({
  firstName,
  lastName,
  items
}: ListItemCardProps) => {
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 275, my: 5 }}>
        <CardContent>
          <p>
            {firstName} {lastName}{' '}
          </p>
          <p>{items.length} items</p>
          <Button>Select</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListItemCard;
