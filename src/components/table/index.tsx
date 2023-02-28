/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

import React, { useEffect, useMemo, useState, useRef, useContext } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CellClickedEvent, ColDef } from "@ag-grid-community/core";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { buildRow, TableRow } from "../../types/table-row";

import {
	defaultColDef,
	defaultColumnDefinitions,
} from "../../utility/table-defaults";

import Spell from "../../types/spell";
import { mapColumnToDisplayName } from "../../enums/columns";
import { Theme } from "../../enums/theme";
import { ThemeContext } from "../theme-context-provider";
import { ColumnContext } from "../column-context-provider";

import "./table.scss";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Table = (): JSX.Element => {
	const [spellRows, setSpellRows] = useState<TableRow[] | null>();
	useMemo(async () => {
		const data = await import("../../assets/5e-spells.json");
		setSpellRows(data.spells.map(buildRow));
	}, []);
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalText, setModalText] = useState<string>("");
	const gridRef = useRef<AgGridReact>(null);
	const { currentTheme: selectedTheme } = useContext(ThemeContext);
	const { selectedColumns } = useContext(ColumnContext);

	const showModalWithMessage = (message: string): void => {
		setModalText(message);
		setModalIsOpen(true);
	};

	const handleModalClose = () => setModalIsOpen(false);

	const onMaterialCellClicked = (event: CellClickedEvent<Spell>): void => {
		if (event?.data?.material) {
			setModalTitle("Material");
			showModalWithMessage(event?.data?.material);
		}
	};

	const onDetailsCellClicked = (event: CellClickedEvent<Spell>): void => {
		if (event?.data?.details) {
			setModalTitle("Details");
			showModalWithMessage(event?.data?.details);
		}
	};

	const startingColumnDefinition = useMemo<ColDef[]>(
		() =>
			defaultColumnDefinitions(
				onMaterialCellClicked,
				onDetailsCellClicked,
			),
		[],
	);

	const [columnDefinitions, setColumnDefinitions] = useState(
		startingColumnDefinition,
	);

	useEffect(() => {
		for (const columnDefinition of columnDefinitions) {
			if (columnDefinition.checkboxSelection === true) continue;
			if (
				selectedColumns.find(
					(value) =>
						columnDefinition.headerName ===
						mapColumnToDisplayName(value),
				) === undefined
			)
				columnDefinition.hide = true;
			else columnDefinition.hide = false;

			setColumnDefinitions([...columnDefinitions, columnDefinition]);
		}
	}, [selectedColumns]);

	return (
		<React.Fragment>
			<Modal show={modalIsOpen} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>{modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalText}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<div
				className={`grid-container ag-theme-alpine${
					selectedTheme === Theme.Dark ? "-dark" : ""
				}`}
			>
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefinitions}
					rowData={spellRows}
					defaultColDef={useMemo<ColDef>(() => defaultColDef, [])}
					animateRows={true}
					rowSelection="multiple"
					suppressRowClickSelection
				/>
			</div>
		</React.Fragment>
	);
};

export default Table;