import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import LineChart from './LineChart';
import RadialChart from './RadialChart';
import api from '../../../../api/Api.js';
import TopProjects from './TopProjects';
import { useGetLastDonations } from './useGetLastDonations';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ApexChartsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Estadísticas">
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>

          <Typography variant="body1" color="textPrimary">
            Gráficos
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Estadísticas
        </Typography>
        <Box mt={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box height="100%">
                <LineChart />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box height="100%">
                <RadialChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Grid container>
            <Grid item xs={12}>
              <TopProjects />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ApexChartsView;
