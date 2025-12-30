import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { CellValueChangedEvent, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { exerciseApi, handleApiError } from '../services/api';
import type {
  Exercise,
  ExerciseCategory,
  ExerciseWithCategory,
  ExerciseItem,
  RowData
} from '../types';
import type { ColumnDefType } from '../types/agGrid';
import '../styles/ExerciseTable.css';

function ExerciseTable() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newExerciseName, setNewExerciseName] = useState<string>('');
  const [newExerciseCategory, setNewExerciseCategory] = useState<ExerciseCategory>('PUSH');
  const [showAddExercise, setShowAddExercise] = useState<boolean>(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await exerciseApi.getAllExercises();
      setExercises(response.data);
      setError(null);
    } catch (err: unknown) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Get all unique exercise names with their categories
  const getExerciseList = useCallback((): ExerciseWithCategory[] => {
    const exerciseMap = new Map<string, ExerciseCategory>();
    exercises.forEach(ex => {
      if (!exerciseMap.has(ex.name)) {
        exerciseMap.set(ex.name, ex.category);
      }
    });
    return Array.from(exerciseMap.entries()).map(([name, category]) => ({ name, category }));
  }, [exercises]);

  // Get all unique week numbers
  const getWeekNumbers = useCallback((): number[] => {
    const weeks = exercises.map(ex => ex.weekNumber);
    return [...new Set(weeks)].sort((a, b) => a - b);
  }, [exercises]);

  // Transform data for AG Grid: rows = weeks, columns = exercises
  const rowData = useMemo((): RowData[] => {
    const weeks = getWeekNumbers();
    const exerciseList = getExerciseList();

    return weeks.map(week => {
      const rowData: RowData = { week };

      exerciseList.forEach(({ name }) => {
        const exercise = exercises.find(ex => ex.weekNumber === week && ex.name === name);
        rowData[name] = exercise
          ? { reps: exercise.maxReps, id: exercise.id }
          : { reps: null, id: null };
      });

      return rowData;
    });
  }, [exercises, getWeekNumbers, getExerciseList]);

  // Create column definitions dynamically
  const columnDefs = useMemo((): ColumnDefType[] => {
    const exerciseList = getExerciseList();

    // Group exercises by category
    const pushExercises = exerciseList.filter(ex => ex.category === 'PUSH');
    const pullExercises = exerciseList.filter(ex => ex.category === 'PULL');
    const legExercises = exerciseList.filter(ex => ex.category === 'LEG');

    const createExerciseColumn = (exerciseName: string) => ({
      field: exerciseName,
      headerName: exerciseName,
      editable: true,
      cellStyle: { textAlign: 'center' },
      valueGetter: (params: ValueGetterParams<RowData>) => {
        const value = params.data?.[exerciseName];
        return typeof value === 'object' && value !== null ? value.reps : null;
      },
      valueSetter: (params: ValueSetterParams<RowData>) => {
        const newValue = parseInt(params.newValue);
        if (isNaN(newValue)) return false;

        if (params.data) {
          const currentValue = params.data[exerciseName];
          params.data[exerciseName] = {
            ...(typeof currentValue === 'object' && currentValue !== null ? currentValue : {}),
            reps: newValue
          } as ExerciseItem;
        }
        return true;
      },
      width: 130,
      cellClass: 'editable-cell'
    });

    const columns: ColumnDefType[] = [
      {
        field: 'week',
        headerName: 'Week',
        pinned: 'left',
        width: 100,
        cellStyle: { fontWeight: 'bold', backgroundColor: '#f8f9fa' },
        editable: false
      }
    ];

    // Add PUSH exercises
    if (pushExercises.length > 0) {
      columns.push({
        headerName: 'PUSH',
        headerClass: 'category-header-push',
        children: pushExercises.map(ex => createExerciseColumn(ex.name))
      });
    }

    // Add PULL exercises
    if (pullExercises.length > 0) {
      columns.push({
        headerName: 'PULL',
        headerClass: 'category-header-pull',
        children: pullExercises.map(ex => createExerciseColumn(ex.name))
      });
    }

    // Add LEG exercises
    if (legExercises.length > 0) {
      columns.push({
        headerName: 'LEG',
        headerClass: 'category-header-leg',
        children: legExercises.map(ex => createExerciseColumn(ex.name))
      });
    }

    return columns;
  }, [getExerciseList]);

  const handleCellValueChanged = useCallback(async (event: CellValueChangedEvent<RowData>): Promise<void> => {
    const { data, colDef } = event;

    if (!data || !colDef.field) return;

    const exerciseName = colDef.field;
    const week = data.week;
    const exerciseData = data[exerciseName];

    if (!exerciseData || typeof exerciseData !== 'object') return;

    try {
      if (exerciseData.id) {
        // Update existing exercise
        const exercise = exercises.find(ex => ex.id === exerciseData.id);
        if (!exercise) return;

        await exerciseApi.updateExercise(exerciseData.id, {
          ...exercise,
          maxReps: exerciseData.reps ?? 0
        });
      } else {
        // Create new exercise
        const exerciseList = getExerciseList();
        const category = exerciseList.find(ex => ex.name === exerciseName)?.category || 'PUSH';

        const response = await exerciseApi.createExercise({
          name: exerciseName,
          maxReps: exerciseData.reps ?? 0,
          weekNumber: typeof week === 'number' ? week : 0,
          category
        });

        // Update the data with the new ID
        if (typeof exerciseData === 'object' && exerciseData !== null) {
          (exerciseData as ExerciseItem).id = response.data.id;
        }
      }

      await loadExercises();
    } catch (err: unknown) {
      setError(handleApiError(err));
    }
  }, [exercises, getExerciseList]);

  const handleAddExercise = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!newExerciseName.trim()) return;

    try {
      const weeks = getWeekNumbers();
      const firstWeek = weeks.length > 0 ? weeks[0] : 1;

      await exerciseApi.createExercise({
        name: newExerciseName.trim(),
        maxReps: 0,
        weekNumber: firstWeek,
        category: newExerciseCategory
      });

      setNewExerciseName('');
      setNewExerciseCategory('PUSH');
      setShowAddExercise(false);
      await loadExercises();
    } catch (err: unknown) {
      setError(handleApiError(err));
    }
  };

  const handleAddWeek = async (): Promise<void> => {
    const weeks = getWeekNumbers();
    const newWeek = weeks.length > 0 ? Math.max(...weeks) + 1 : 1;

    try {
      const exerciseList = getExerciseList();
      for (const { name, category } of exerciseList) {
        await exerciseApi.createExercise({
          name,
          maxReps: 0,
          weekNumber: newWeek,
          category
        });
      }
      await loadExercises();
    } catch (err: unknown) {
      setError(handleApiError(err));
    }
  };

  const handleDeleteExercise = async (exerciseName: string): Promise<void> => {
    if (!window.confirm(`Delete all entries for ${exerciseName}?`)) return;

    try {
      const toDelete = exercises.filter(ex => ex.name === exerciseName);
      for (const exercise of toDelete) {
        await exerciseApi.deleteExercise(exercise.id);
      }
      await loadExercises();
    } catch (err: unknown) {
      setError(handleApiError(err));
    }
  };

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }), []);

  if (loading) return <div className="exercise-table-container"><p>Loading exercises...</p></div>;
  if (error) return <div className="exercise-table-container"><p className="error">{error}</p></div>;

  return (
    <div className="exercise-table-container">
      <div className="controls">
        <button onClick={handleAddWeek} className="btn-primary">
          + Add Week
        </button>
        <button onClick={() => setShowAddExercise(!showAddExercise)} className="btn-secondary">
          + Add Exercise
        </button>
      </div>

      {showAddExercise && (
        <form onSubmit={handleAddExercise} className="add-exercise-form">
          <input
            type="text"
            placeholder="Exercise Name (e.g., Bench Press)"
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.target.value)}
            required
            autoFocus
          />
          <select
            value={newExerciseCategory}
            onChange={(e) => setNewExerciseCategory(e.target.value as ExerciseCategory)}
          >
            <option value="PUSH">Push</option>
            <option value="PULL">Pull</option>
            <option value="LEG">Leg</option>
          </select>
          <button type="submit" className="btn-primary">Add</button>
          <button type="button" onClick={() => setShowAddExercise(false)} className="btn-cancel">Cancel</button>
        </form>
      )}

      {rowData.length === 0 ? (
        <div className="empty-state">
          <p>No exercises yet!</p>
          <p>Click "+ Add Week" to start tracking your exercises</p>
        </div>
      ) : (
        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
          <AgGridReact<RowData>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={handleCellValueChanged}
            suppressMovableColumns={true}
            enableCellTextSelection={true}
            ensureDomOrder={true}
          />
        </div>
      )}

      {getExerciseList().length > 0 && (
        <div className="exercise-management">
          <h3>Manage Exercises</h3>
          <div className="exercise-list">
            {getExerciseList().map(({ name, category }) => (
              <div key={name} className="exercise-item">
                <span className={`category-badge category-${category.toLowerCase()}`}>{category}</span>
                <span className="exercise-name">{name}</span>
                <button
                  onClick={() => handleDeleteExercise(name)}
                  className="delete-btn-small"
                  title={`Delete ${name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseTable;
