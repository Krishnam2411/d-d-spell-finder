/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

import { CellClickedEvent, ColDef } from "ag-grid-community";

import AreaFilter from "../components/filters/area-filter/area-filter";
import AttackFilter from "../components/filters/attack-filter/attack-filter";
import BooleanFilter from "../components/filters/boolean-filter/boolean-filter";
import CastingTimeFilter from "../components/filters/casting-time-filter/casting-time-filter";
import DamageTypeFilter from "../components/filters/damage-type-filter/damage-type-filter";
import DurationFilter from "../components/filters/duration-filter/duration-filter";
import EffectFilter from "../components/filters/effect-filter/effect-filter";
import LevelFilter from "../components/filters/level-filter/level-filter";
import RangeFilter from "../components/filters/range-filter/range-filter";
import SavingThrowFilter from "../components/filters/saving-throw-filter/saving-throw-filter";
import SchoolFilter from "../components/filters/school-filter/school-filter";
import SourceFilter from "../components/filters/source-filter/source-filter";
import { Column, mapColumnToDisplayName } from "../enums/columns";
import Spell from "../types/spell";

import { areaValueComparator } from "./comparators";
import {
	rangeTooltipValueGetter,
	sourceTooltipValueGetter,
} from "./tooltip-value-getters";
import {
	areaValueFormatter,
	attackValueFormatter,
	booleanValueFormatter,
	castingTimeValueFormatter,
	damageTypeValueFormatter,
	durationValueFormatter,
	effectValueFormatter,
	rangeValueFormatter,
	savingThrowValueFormatter,
	schoolValueFormatter,
	sourceValueFormatter,
} from "./value-formatters";

export const defaultColDef: ColDef = {
	filter: true,
	sortable: true,
	resizable: true,
	wrapHeaderText: true,
};

export const defaultSelectedColumns: Column[] = [
	Column.Name,
	Column.Level,
	Column.CastingTime,
	Column.Duration,
	Column.Range,
	Column.Area,
	Column.Attack,
	Column.Save,
	Column.Damage,
	Column.Effect,
	Column.Material,
	Column.Source,
	Column.Details,
];

const defaultColumnIsHidden = (column: Column): boolean =>
	defaultSelectedColumns.find((value) => value === column) === undefined;

export const defaultColumnDefinitions = (
	onMaterialCellClicked: (event: CellClickedEvent<Spell>) => void,
	onDetailsCellClicked: (event: CellClickedEvent<Spell>) => void,
): ColDef[] => [
	{
		field: "check",
		headerName: "",
		headerCheckboxSelection: true,
		checkboxSelection: true,
		lockVisible: true,
		lockPosition: true,
		flex: 1,
	},
	{
		field: "name",
		headerName: mapColumnToDisplayName(Column.Name),
		hide: defaultColumnIsHidden(Column.Name),
	},
	{
		field: "level",
		headerName: mapColumnToDisplayName(Column.Level),
		filter: LevelFilter,
		initialWidth: 90,
		hide: defaultColumnIsHidden(Column.Level),
	},
	{
		field: "school",
		headerName: mapColumnToDisplayName(Column.School),
		filter: SchoolFilter,
		valueFormatter: schoolValueFormatter,
		initialWidth: 130,
		hide: defaultColumnIsHidden(Column.School),
	},
	{
		field: "castingTime",
		headerName: mapColumnToDisplayName(Column.CastingTime),
		filter: CastingTimeFilter,
		valueFormatter: castingTimeValueFormatter,
		initialWidth: 110,
		hide: defaultColumnIsHidden(Column.CastingTime),
	},
	{
		field: "duration",
		headerName: mapColumnToDisplayName(Column.Duration),
		filter: DurationFilter,
		valueFormatter: durationValueFormatter,
		initialWidth: 140,
		hide: defaultColumnIsHidden(Column.Duration),
	},
	{
		field: "range",
		headerName: mapColumnToDisplayName(Column.Range),
		filter: RangeFilter,
		valueFormatter: rangeValueFormatter,
		tooltipValueGetter: rangeTooltipValueGetter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Range),
	},
	{
		field: "area",
		headerName: mapColumnToDisplayName(Column.Area),
		filter: AreaFilter,
		valueFormatter: areaValueFormatter,
		comparator: areaValueComparator,
		initialWidth: 100,
	},
	{
		field: "attack",
		headerName: mapColumnToDisplayName(Column.Attack),
		filter: AttackFilter,
		valueFormatter: attackValueFormatter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Attack),
	},
	{
		field: "save",
		headerName: mapColumnToDisplayName(Column.Save),
		filter: SavingThrowFilter,
		valueFormatter: savingThrowValueFormatter,
		initialWidth: 110,
		hide: defaultColumnIsHidden(Column.Save),
	},
	{
		field: "damage",
		headerName: mapColumnToDisplayName(Column.Damage),
		filter: DamageTypeFilter,
		valueFormatter: damageTypeValueFormatter,
		initialWidth: 110,
		hide: defaultColumnIsHidden(Column.Damage),
	},
	{
		field: "effect",
		headerName: mapColumnToDisplayName(Column.Effect),
		filter: EffectFilter,
		valueFormatter: effectValueFormatter,
		initialWidth: 110,
		hide: defaultColumnIsHidden(Column.Effect),
	},
	{
		field: "ritual",
		headerName: mapColumnToDisplayName(Column.Ritual),
		filter: BooleanFilter,
		filterParams: {
			spellPropertyName: "ritual",
		},
		valueFormatter: booleanValueFormatter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Ritual),
	},
	{
		field: "concentration",
		headerName: mapColumnToDisplayName(Column.Concentration),
		filter: BooleanFilter,
		filterParams: {
			spellPropertyName: "concentration",
		},
		valueFormatter: booleanValueFormatter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Concentration),
	},
	{
		field: "verbal",
		headerName: mapColumnToDisplayName(Column.Verbal),
		filter: BooleanFilter,
		filterParams: {
			spellPropertyName: "verbal",
		},
		valueFormatter: booleanValueFormatter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Verbal),
	},
	{
		field: "somatic",
		headerName: mapColumnToDisplayName(Column.Somatic),
		filterParams: {
			spellPropertyName: "somatic",
		},
		filter: BooleanFilter,
		valueFormatter: booleanValueFormatter,
		initialWidth: 100,
		hide: defaultColumnIsHidden(Column.Somatic),
	},
	{
		field: "material",
		headerName: mapColumnToDisplayName(Column.Material),
		tooltipField: "material",
		onCellClicked: onMaterialCellClicked,
		sortable: false,
		hide: defaultColumnIsHidden(Column.Material),
	},
	{
		field: "source",
		headerName: mapColumnToDisplayName(Column.Source),
		valueFormatter: sourceValueFormatter,
		filter: SourceFilter,
		tooltipValueGetter: sourceTooltipValueGetter,
		hide: defaultColumnIsHidden(Column.Source),
	},
	{
		field: "details",
		headerName: mapColumnToDisplayName(Column.Details),
		tooltipField: "details",
		onCellClicked: onDetailsCellClicked,
		sortable: false,
		hide: defaultColumnIsHidden(Column.Details),
	},
];
