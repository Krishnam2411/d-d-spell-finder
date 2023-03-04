/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

import React, {
	forwardRef,
	ReactElement,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
	createDisabledFilterArray,
	numberBasedFilterDoesFilterPass,
	numberBasedFilterHandleCheck,
	numberBasedFilterIsChecked,
	numberBasedFilterIsFilterActive,
	NumberBasedFilterProps,
	NumberBasedFilterSetModel,
} from "../../../utility/filters/number-based-filter";
import { AgGridFilterProps } from "../../../types/ag-grid-filter-props";

import "./level-filter.scss";

const filterDisabledArray = createDisabledFilterArray(10);

const LevelFilter = forwardRef(
	(props: AgGridFilterProps, ref): ReactElement => {
		const [selectedLevels, setSelectedLevels] =
			useState<number[]>(filterDisabledArray);

		useEffect(() => {
			props.filterChangedCallback();
		}, [selectedLevels]);

		useImperativeHandle(ref, () => {
			const doesFilterPass = (props: NumberBasedFilterProps) => {
				return numberBasedFilterDoesFilterPass(
					props?.data?.level,
					selectedLevels,
				);
			};

			const isFilterActive = () => {
				return numberBasedFilterIsFilterActive(
					selectedLevels.length,
					filterDisabledArray.length,
				);
			};

			const getModel = () => {
				if (!isFilterActive()) {
					return null;
				}

				return { value: selectedLevels };
			};

			const setModel = (model: NumberBasedFilterSetModel) => {
				setSelectedLevels(model?.value ?? []);
			};

			return {
				doesFilterPass,
				isFilterActive,
				getModel,
				setModel,
			};
		});

		const handleCheck = useCallback(
			(x: number): void =>
				numberBasedFilterHandleCheck(
					selectedLevels,
					setSelectedLevels,
					x,
				),
			[],
		);

		const isChecked = (x: number): boolean | undefined =>
			numberBasedFilterIsChecked(selectedLevels, x);

		return (
			<div className="level-filter">
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(0)}
					label={"0"}
					checked={isChecked(0)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(1)}
					label={"1"}
					checked={isChecked(1)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(2)}
					label={"2"}
					checked={isChecked(2)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(3)}
					label={"3"}
					checked={isChecked(3)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(4)}
					label={"4"}
					checked={isChecked(4)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(5)}
					label={"5"}
					checked={isChecked(5)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(6)}
					label={"6"}
					checked={isChecked(6)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(7)}
					label={"7"}
					checked={isChecked(7)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(8)}
					label={"8"}
					checked={isChecked(8)}
				/>
				<Form.Check
					type={"checkbox"}
					onChange={() => handleCheck(9)}
					label={"9"}
					checked={isChecked(9)}
				/>
				<Button
					variant="outline-primary"
					onClick={() =>
						useCallback(
							() => setSelectedLevels(filterDisabledArray),
							[],
						)
					}
				>
					All
				</Button>
				<Button
					variant="outline-primary"
					onClick={() => useCallback(() => setSelectedLevels([]), [])}
				>
					None
				</Button>
			</div>
		);
	},
);

LevelFilter.displayName = "LevelFilter";

export default LevelFilter;
