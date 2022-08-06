import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Group, Select, Text, TextInput } from '@mantine/core'
import { Empty } from '@voyage-app/shared-ui-components';
import { Check, Pencil, Search, Trash } from 'tabler-icons-react'
import { PATHS } from '../../../utils/constants';
import DataGrid from '../../../components/DataGrid';
import ContentContainer from '../../../layout/ContentContainer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { changeRole, removeMember, useMembers } from '../../../store/feature/memberSlice'
import { TeamRole } from '../../../utils/types'
import { showNotification } from '@mantine/notifications';
import { capitalize } from '@voyage-app/shared-utils'
import { useModals } from '@mantine/modals'
import _ from 'lodash'

const team = () => {
	const modals = useModals();
	const router = useRouter();
	const dispatch = useDispatch();
	const team = useSelector(useMembers);
	const [filteredTeam, setFilter] = useState([...team]);

	const openConfirmModal = (id: string, name) =>
		modals.openConfirmModal({
			title: 'Delete Team Member',
			children: (
				<Text size='md'>
					You have selected <strong>{name}</strong>
					<br />
					Are you sure you want to delete this member?
				</Text>
			),
			labels: { confirm: 'Delete', cancel: 'Cancel' },
			onConfirm: () => dispatch(removeMember(id)),
			onCancel: () => console.log('Cancel'),
			classNames: {
				title: 'modal-header'
			},
			confirmProps: {
				color: 'red',
				classNames: {
					root: 'bg-red-500'
				}
			},
			closeOnCancel: true,
			closeOnConfirm: true
		});

	const debouncedSearch = useRef(_.debounce(value => {
		setFilter(prevState => value.length >= 2 ?  team.filter(({ fullName, email, phone, role }) => fullName.includes(value) || email.includes(value) || phone.includes(value) || role.includes(value.toLowerCase())) : team);
	}, 300)).current;

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const rows = filteredTeam.map((element, index) => {
		return (
			<tr key={index}>
				<td colSpan={1}>
					<span>{element.firstname}</span>
				</td>
				<td colSpan={1}>
					<span>{element.lastname}</span>
				</td>
				<td colSpan={1}>
					<span className='text-base font-normal'>{element.email}</span>
				</td>
				<td colSpan={1}>
					<span>{element.phone}</span>
				</td>
				<td colSpan={1}>
					<div className='flex flex-col flex-shrink'>
						<Select
							classNames={{
								item: 'capitalize',
								input: 'capitalize'
							}}
							data={Object.values(TeamRole)}
							defaultValue={element.role}
							variant='unstyled'
							onChange={(value: TeamRole) => {
								dispatch(changeRole({id: element.memberId, role: value}))
								showNotification({
									id: 'new-member-success',
									disallowClose: true,
									onClose: () => console.log('unmounted'),
									onOpen: () => console.log('mounted'),
									autoClose: 3000,
									title: "Success",
									message: `${element.firstname} has a new role of ${capitalize(value)}!`,
									color: 'green',
									icon: <Check size={20}/>,
									loading: false,
								});
							}}
						/>
					</div>
				</td>
				<td colSpan={2}>
					<Group spacing="md" position='left'>
						<ActionIcon size="sm" onClick={() => router.push({
								pathname: `${PATHS.NEW_MEMBER}`,
								query: { memberId: element.memberId }
							}
						)}>
							<Pencil />
						</ActionIcon>
						<ActionIcon size="sm" color='red' onClick={() => openConfirmModal(element.memberId, element.fullName)}>
							<Trash />
						</ActionIcon>
					</Group>
				</td>
			</tr>
		);
	});
	return (
		<ContentContainer classNames='py-4 px-8 min-h-screen'>
			<div className='flex justify-between items-center mt-2 mb-6'>
				<TextInput className='w-96' radius={0} icon={<Search size={18} />} onChange={(e) => debouncedSearch(e.target.value)} placeholder='Search for name, email or phone' size='md' />
				<button className='voyage-button' onClick={() => router.push(PATHS.NEW_MEMBER)}>
					<span className='text-base'>Add member</span>
				</button>
			</div>
			<DataGrid
				rows={rows}
				headings={['First Name', 'Last Name', 'Email', 'Phone', 'Role', 'Actions']}
				emptyContent={
					<Empty
						message={
							<span className='text-center text-2xl'>
								You have no team members
								<br />
								Click the 'Add Member' button to add a new member
							</span>
						}
					/>
				}
				spacingY='md'
			/>
		</ContentContainer>
	);
};

export default team;
