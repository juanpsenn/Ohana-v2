import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  Card
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Calendar as CalendarIcon } from 'react-feather';
import CardEvents from 'src/components/CardEvents';
import api from './../../../api/Api';
import NoResults from './../../../components/NoResults/NoResults';
import CircularProgress from './../DashboardAlternativeView/MostProfitableProducts/CircularProgress';

const timeRanges = [
  {
    value: 'today',
    text: 'Hoy'
  },
  {
    value: 'yesterday',
    text: 'Ayer'
  },
  {
    value: 'last_30_days',
    text: 'Últimos 30 días'
  },
  {
    value: 'last_year',
    text: 'Último año'
  }
];

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '1280px',
    margin: '0 183px',
    padding: '0 24px'
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(timeRanges[2].text);
  const [mode, setMode] = useState('grid');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await api.getEvents(1, 99, '');
      const result = response.results.filter(event => event.contact.name === localStorage.getItem('username'));
      console.log(response);
      setEvents(result);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      justify='space-between'
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize='small' />}
          aria-label='breadcrumb'
        >
          <Link
            variant='body1'
            color='inherit'
            to='/app'
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography variant='body1' color='textPrimary'>
            Listar
          </Typography>
        </Breadcrumbs>
        <Typography variant='h3' color='textPrimary'>
          Mis Campañas Activas
        </Typography>
      </Grid>
      <Grid item>
        <Button
          ref={actionRef}
          onClick={() => setMenuOpen(true)}
          startIcon={
            <SvgIcon fontSize='small'>
              <CalendarIcon />
            </SvgIcon>
          }
        >
          {timeRange}
        </Button>
        <Menu
          anchorEl={actionRef.current}
          onClose={() => setMenuOpen(false)}
          open={isMenuOpen}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {timeRanges.map(_timeRange => (
            <MenuItem
              key={_timeRange.value}
              onClick={() => setTimeRange(_timeRange.text)}
            >
              {_timeRange.text}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {!!loading ? (
        <CircularProgress
          value={5}
          color='inherit' size={20} />
      ) : (
        !!events && events.length > 0 ? (
          <Grid container spacing={3}>
            {events.map(project => (

              <Grid
                item
                key={project.id}
                md={mode === 'grid' ? 4 : 12}
                sm={mode === 'grid' ? 6 : 12}
                xs={12}
              >
                <CardEvents project={project} userMode={true} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <NoResults title={'No se encontraron resultados'} />
          </Card>
        )
      )}
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
