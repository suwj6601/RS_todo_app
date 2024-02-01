import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Input,
  InputRef,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  TableColumnType,
  message,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TodoListModal from './TodoListModal';
import './style.scss';
import { PRIORITY, STATUS } from 'src/constants/consts';
import CONSTS from '../../constants/consts';
import dayjs from 'dayjs';
import { actDeleteTodo, actSetSelectedTodo, getListTodoApp } from 'src/redux/action/todo';

type DataIndex = keyof DataType;

interface DataType {
  index: number;
  title: string;
  description: string;
  status: string;
  dueDate: any;
  priority: string;
}

const renderFilter = (data: any) => {
  const resultFilter = Object.entries(data).map(([key, value]) => ({
    _key: key,
    text: value,
    value: value,
  }));

  return resultFilter;
};

const statusFilter = renderFilter(STATUS);
const priorityFilter = renderFilter(PRIORITY);

const renderColumns = (
  renderStatus,
  onEditTodo,
  onDeleteTodo,
  renderPriority,
  getColumnSearchProps,
) => {
  return [
    {
      title: 'Index',
      dataIndex: 'index',
      width: '5%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      filters: statusFilter,
      onFilter: (value: string, record) => record.status === value,
      render: (value) => {
        const listName = renderStatus(value);

        return listName;
      },
    },
    {
      title: 'Due date',
      dataIndex: 'dueDate',
      width: '20%',
      render: (value) => {
        const currentDate = dayjs();
        const dateTimeToCheck = dayjs(dayjs(value[1]).toISOString());
        const isOverDue = dateTimeToCheck.isBefore(currentDate);

        const startDate = dayjs(value[0]).format(CONSTS.FORMAT_TIME);
        const endDate = dayjs(value[1]).format(CONSTS.FORMAT_TIME);

        return (
          <span style={{ color: isOverDue ? 'red' : undefined }}>
            {startDate} - {endDate}
          </span>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: '5%',
      onFilter: (value: string, record) => record.priority === value,
      render: (value) => renderPriority(value),
      filters: priorityFilter,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      /* @ts-ignore */
      render: (value, record) => (
        <div className='list-icon'>
          <EditOutlined onClick={() => onEditTodo(record)} />

          <Popconfirm
            title='Delete todo job'
            description='Are you sure to delete this todo?'
            onConfirm={() => onDeleteTodo(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <DeleteOutlined color='red' />
          </Popconfirm>
        </div>
      ),
    },
  ];
};

const renderStatus = (status: string) => {
  let colorClass = '';
  let backgroundClass = '';

  switch (status) {
    case STATUS.TODO:
      colorClass = 'text-red-600';
      backgroundClass = 'bg-red-200';
      break;
    case STATUS.DONE:
      colorClass = 'text-green-600';
      backgroundClass = 'bg-green-100';
      break;
    case STATUS.HOLD:
      colorClass = 'text-yellow-800';
      backgroundClass = 'bg-yellow-200';
      break;
    default:
      colorClass = 'text-white';
      break;
  }

  return (
    <div
      className={`w-20 p-2 rounded-lg font-semibold text-center ${colorClass} ${backgroundClass}`}
    >
      {status}
    </div>
  );
};

const renderPriority = (priority: string) => {
  let colorClass = '';
  let backgroundClass = '';
  let widthClass = '';

  switch (priority) {
    case PRIORITY.HIGH:
      colorClass = 'text-red-600';
      backgroundClass = 'bg-red-200';
      widthClass = 'w-20';
      break;
    case PRIORITY.MEDIUM:
      colorClass = 'text-green-600';
      backgroundClass = 'bg-green-100';
      widthClass = 'w-20'; // Adjust the width as needed
      break;
    case PRIORITY.LOW:
      colorClass = 'text-yellow-800';
      backgroundClass = 'bg-yellow-200';
      widthClass = 'w-20';
      break;
    default:
      colorClass = 'text-white';
      break;
  }

  return (
    <div
      className={`p-2 rounded-lg font-semibold text-center ${colorClass} ${backgroundClass} ${widthClass}`}
    >
      {priority}
    </div>
  );
};

const TodoListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [page, onSetPage] = useState(1);
  const [pageSize, onSetPageSize] = useState(5);
  const [dataSource, setDataSource] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(true);
  const searchInput = useRef<InputRef>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const todoAppState = useSelector((state: any) => state.TodoApp);
  const { todoList } = todoAppState;

  const totalData = todoList?.length || 0;
  const onShowTotalData = () => {
    return <>Has {totalData} data</>;
  };

  useEffect(() => {
    dispatch(getListTodoApp());
    setIsLoadingTable(false);
  }, []);

  useEffect(() => {
    const updatedDataSource = paginateData(todoList, page, pageSize).map((item, index: number) => ({
      ...item,
      index: index + 1,
    }));

    /* @ts-ignore */
    setDataSource(updatedDataSource);
  }, [page, pageSize, todoAppState?.todoList]);

  const onAddTodo = () => {
    setIsModalOpen(true);
  };

  const onEditTodo = (record: any) => {
    dispatch(actSetSelectedTodo(record));
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    dispatch(actSetSelectedTodo(null));
    setIsModalOpen(false);
  };

  const warningDeleteTodo = () => {
    messageApi.open({
      type: 'warning',
      content: 'Select todo to delete',
    });
  };

  const onShowDeleteNotificationSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Delete successfully',
    });
  };

  const onDeleteTodo = (deleteId: string) => {
    if (!deleteId) return warningDeleteTodo();
    dispatch(actDeleteTodo(deleteId));
    dispatch(getListTodoApp());
    onShowDeleteNotificationSuccess();
  };

  const paginateData = (data: any[], page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  /* @ts-ignore */
  const onTableChange = (pagination?: PaginationProps, filter?: any, sorter?: any) => {
    if (pagination?.current !== page) {
      onSetPage(pagination?.current as number);
    }
    if (pagination?.pageSize !== pageSize) {
      onSetPageSize(pagination?.pageSize as number);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  return (
    <>
      {contextHolder}
      <div className='heading'>
        <Button onClick={onAddTodo}>+ Add</Button>
      </div>

      <Table
        loading={isLoadingTable}
        dataSource={dataSource}
        /* @ts-ignore */
        columns={renderColumns(
          renderStatus,
          onEditTodo,
          onDeleteTodo,
          renderPriority,
          getColumnSearchProps,
        )}
        pagination={{
          total: totalData,
          pageSize,
          pageSizeOptions: ['5', '10', '15', '20'],
          current: page,
          showSizeChanger: true,
          size: 'small',
          locale: { items_per_page: '/ trang' },
          showTotal: onShowTotalData,
        }}
        onChange={onTableChange}
        size='middle'
        style={{ width: '98vw' }}
      />

      <TodoListModal isOpen={isModalOpen} onCloseModal={onCloseModal} />
    </>
  );
};

export default TodoListPage;
