import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-big-calendar';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import * as dates from 'date-arithmetic'
import moment from 'moment';

export default function CustomWeekView({ date, localizer, max = localizer.endOf(new Date(), 'day'), min = localizer.startOf(new Date(), 'day'), scrollToTime = localizer.startOf(new Date(), 'day'), ...props }) {
	const currRange = useMemo(() => CustomWeekView.range(date, { localizer }), [date, localizer]);

	return <TimeGrid date={date} eventOffset={15} localizer={localizer} max={max} min={min} range={currRange} scrollToTime={scrollToTime} {...props} />;
}

CustomWeekView.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	localizer: PropTypes.object,
	max: PropTypes.instanceOf(Date),
	min: PropTypes.instanceOf(Date),
	scrollToTime: PropTypes.instanceOf(Date)
};

CustomWeekView.range = (date, { localizer }) => {
	// const start = moment(date).startOf('hour')
	const start = dates.startOf(date, 'day')
	const end = localizer.add(start, 6, 'day');

	let current = start;
	const range = [];

	while (localizer.lte(current, end, 'day')) {
		range.push(current);
		current = localizer.add(current, 1, 'day');
	}
	return range;
};

CustomWeekView.navigate = (date, action, { localizer }) => {
	switch (action) {
		case Navigate.PREVIOUS:
			return localizer.add(date, -7, 'day');

		case Navigate.NEXT:
			return localizer.add(date, 7, 'day');

		default:
			return date;
	}
};

CustomWeekView.title = (date, { localizer }) => {
	const [start, ...rest] = CustomWeekView.range(date, { localizer });
	return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
};
