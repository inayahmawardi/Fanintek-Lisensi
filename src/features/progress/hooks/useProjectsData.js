// Re-export the central hook implementation so code that imports
// from `src/features/progress/hooks/useProjectsData` continues to work.
import useProjectsData from '../../../hooks/useProjectsData';

export default useProjectsData;

// NOTE: If you prefer keeping a separate implementation per-feature,
// replace this re-export with the actual hook implementation.
// ...akan diisi ulang dari file lama...