import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DeadlineCalendar = ({ tasks }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Obtenir les jours du mois actuel
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Obtenir le premier jour du mois (0 = dimanche, 1 = lundi, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Formater le mois et l'année
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };
  
  // Passer au mois précédent
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Passer au mois suivant
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Obtenir les tâches pour une date spécifique
  const getTasksForDate = (year, month, day) => {
    const date = new Date(year, month, day).toDateString();
    return tasks.filter(task => new Date(task.dueDate).toDateString() === date);
  };
  
  // Générer le calendrier
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const calendar = [];
    let day = 1;
    
    // Noms des jours de la semaine
    const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    // En-tête des jours de la semaine
    const header = (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(weekday => (
          <div key={weekday} className="text-center text-xs font-medium text-gray-400">
            {weekday}
          </div>
        ))}
      </div>
    );
    
    calendar.push(header);
    
    // Corps du calendrier
    const rows = [];
    let cells = [];
    
    // Cellules vides pour les jours avant le premier jour du mois
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="p-1 text-center text-gray-600">
          &nbsp;
        </div>
      );
    }
    
    // Cellules pour les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      const tasksForDay = getTasksForDate(year, month, i);
      const isToday = new Date(year, month, i).toDateString() === new Date().toDateString();
      
      cells.push(
        <div 
          key={`day-${i}`} 
          className={`p-1 text-center relative ${isToday ? 'bg-primary bg-opacity-20 rounded' : ''}`}
        >
          <div className="text-xs">{i}</div>
          {tasksForDay.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="flex space-x-1">
                {tasksForDay.slice(0, 3).map((task, index) => {
                  let statusColor = 'bg-gray-500';
                  if (task.status === 'Terminé') statusColor = 'bg-green-500';
                  if (task.status === 'En cours') statusColor = 'bg-orange-500';
                  if (task.status === 'En attente') statusColor = 'bg-blue-500';
                  if (task.status === 'Retard') statusColor = 'bg-red-500';
                  
                  return (
                    <div 
                      key={`task-${task.id}-${index}`} 
                      className={`w-2 h-2 rounded-full ${statusColor}`}
                      title={task.title}
                    ></div>
                  );
                })}
                {tasksForDay.length > 3 && (
                  <div className="text-xs text-gray-400">+{tasksForDay.length - 3}</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
      
      // Nouvelle ligne après samedi
      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        rows.push(
          <div key={`row-${day}`} className="grid grid-cols-7 gap-1 mb-1">
            {cells}
          </div>
        );
        cells = [];
      }
      
      day++;
    }
    
    // Ajouter les cellules restantes
    if (cells.length > 0) {
      rows.push(
        <div key={`row-last`} className="grid grid-cols-7 gap-1 mb-1">
          {cells}
        </div>
      );
    }
    
    calendar.push(...rows);
    
    return calendar;
  };
  
  return (
    <div className="bg-dark-light rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Calendrier des échéances</h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded hover:bg-dark-darker transition-colors"
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <div className="font-medium">{formatMonthYear(currentMonth)}</div>
          <button 
            onClick={nextMonth}
            className="p-1 rounded hover:bg-dark-darker transition-colors"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={formatMonthYear(currentMonth)}
      >
        {generateCalendar()}
      </motion.div>
    </div>
  );
};

export default DeadlineCalendar;
