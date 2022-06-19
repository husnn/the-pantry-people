import { Container, Grid, Card, Typography } from '@mui/material';
import ListHistory from './ListHistory';
import { ListDTO } from '@tpp/shared';
import { useEffect, useState } from 'react';
import { getOwnLists } from '../modules/api/list';
import NewList from './NewList';

const BeneficiaryDashboard = () => {
  const [lists, setLists] = useState<ListDTO[]>([]);

  useEffect(() => {
    getOwnLists().then((res) => setLists(res.lists));
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ flexGrow: 1, mt: 5, display: 'flex', justifyContent: 'center' }}
    >
      <Grid container spacing={2} maxWidth="sm">
        <Grid item xs>
          <NewList onCreate={(list) => setLists([list, ...lists])} />
        </Grid>

        {lists.length > 0 && (
          <Grid item xs>
            <Card variant="outlined" sx={{ p: 4, mb: 2 }}>
              <Typography
                sx={{ fontSize: 20, mx: 10, mb: 2 }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                Your List History
              </Typography>
              <ListHistory lists={lists} />
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default BeneficiaryDashboard;
