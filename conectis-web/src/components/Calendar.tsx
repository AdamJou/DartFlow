import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
    Views,
    DateLocalizer
} from 'react-big-calendar';
import moment from 'moment';
import React, { Fragment, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import event from 'events';

const localizer = momentLocalizer(moment);

class Event {
    
}

const events = [
    {
        start: moment("2023-07-04T10:00:00").toDate(),
        end: moment("2023-07-04T11:00:00").toDate(),
        title: "notatka notatka hehehe"
    },
    {
        start: moment("2023-07-04T13:30:00").toDate(),
        end: moment("2023-07-04T15:30:00").toDate(),
        title: "druga notatka"
    },
    {
        start: moment("2023-07-04").toDate(),
        end: moment("2023-07-04").toDate(),
        title: "trzecia notatka"
    }

]

export function Calendar(props: Omit<CalendarProps, 'localizer'>) {
    return <BigCalendar {...props} localizer={localizer} events={events} />;
}