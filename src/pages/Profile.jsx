import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../services/usersAPI';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUser(formData);
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center p-8">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Perfil de usuario</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {editMode ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>

          {editMode && (
            <button
              onClick={handleUpdate}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;