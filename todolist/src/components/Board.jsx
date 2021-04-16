import Column from "./column/Column";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from "./utils/Button";
import { URL } from "./utils/constant";
import { DragDropContext } from "react-beautiful-dnd";

const BoardBlock = styled.div`
  display: flex;
`;

const mockData = [
  {
    columnId: 12314,
    columnTitle: "해야할 일",
    items: [
      {
        cardId: 53341,
        cardTitle: "새벽 코딩",
        content: "졸리다 졸려",
      },
      {
        cardId: 64343,
        cardTitle: "배고프다",
        content: "치킨 먹고싶다",
      },
    ],
  },
  {
    columnId: 41212,
    columnTitle: "해야할 일",
    items: [
      {
        cardId: 21441,
        cardTitle: "리액트 공부하기",
        content: "useEffect 콜백 함수에 대해서",
      },
      {
        cardId: 11123,
        cardTitle: "리액트 공부하기2",
        content: "useState에 대해서",
      },
    ],
  },
  {
    columnId: 66323,
    columnTitle: "완료한 일",
    items: [
      {
        cardId: 425,
        cardTitle: "몽고디비 연결",
        content: "몽고디비 연결, 데이터 받아오기",
      },
    ],
  },
];

export default function Board({ onLog }) {
  const [columns, setColumns] = useState(mockData);

  useEffect(() => {
    (async () => {
      const data = await fetch(URL.getDB);
      const json = await data.json();
      setColumns((json[0].columnList.length && json[0].columnList) || mockData);

      await fetch(URL.setDB, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(columns),
      });
    })();
  }, [columns]);

  const addColumn = () => {
    const column = {
      columnId: Date.now(),
      columnTitle: "new column",
      items: [],
    };
    setColumns((columns) => [...columns, column]);
  };

  const deleteColumn = (columnId) => {
    setColumns((columns) =>
      columns.filter((column) => column.columnId !== columnId)
    );
  };

  const setItemsOfColumn = (column) => {
    const target = columns.find((e) => e.columnId === column.columnId);
    target.items = [...column.items];
    setColumns((columns) => [...columns]);
  };

  const setColumnTitle = (newColumn) => {
    const target = columns.map((column) =>
      column.columnId !== newColumn.columnId ? column : newColumn
    );
    setColumns(target);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { droppableId: beforeColumnId, index: beforeIndex } = result.source;
    const {
      droppableId: afterColumnId,
      index: afterIndex,
    } = result.destination;

    let targetItem = {};
    for (const column of columns) {
      if (column.columnId === +beforeColumnId) {
        targetItem = column.items.splice(beforeIndex, 1)[0];
      }
    }
    const newColumns = columns.map((column) => {
      const newColumn = {
        ...column,
        items: [...column.items],
      };
      if (column.columnId === +afterColumnId) {
        console.log("aa");
        newColumn.items.splice(afterIndex, 0, targetItem);
      }
      return newColumn;
    });
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardBlock>
        {columns.map((column) => (
          <Column
            onLog={onLog}
            key={column.columnId}
            column={column}
            setItemsOfColumn={setItemsOfColumn}
            deleteColumn={deleteColumn}
            setColumnTitle={setColumnTitle}
          />
        ))}
        <Button type="add" subType="bigSize" onClick={addColumn} />
      </BoardBlock>
    </DragDropContext>
  );
}
