import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Mail, 
  Database, 
  Server, 
  Lock, 
  Globe,
  Save,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SystemSettings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'general' | 'security' | 'notifications' | 'integrations' | 'backup'>('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'MediConnect',
      siteDescription: 'HIPAA-Compliant Telemedicine Platform',
      timezone: 'America/New_York',
      language: 'en',
      maintenanceMode: false,
      registrationEnabled: true,
      appointmentDuration: 30,
      maxAppointmentsPerDay: 20,
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
      maxLoginAttempts: 5,
      encryptionEnabled: true,
      auditLogging: true,
      hipaaCompliance: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      appointmentReminders: true,
      reminderHours: 24,
      systemAlerts: true,
      securityAlerts: true,
      marketingEmails: false,
    },
    integrations: {
      stripeApiKey: 'sk_test_...',
      twilioAccountSid: '',
      twilioAuthToken: '',
      emailProvider: 'sendgrid',
      sendgridApiKey: 'SG...',
      videoProvider: 'agora',
      agoraAppId: '',
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      backupLocation: 's3',
      lastBackup: '2025-06-15T10:30:00Z',
    },
  });

  const handleSave = (category: keyof typeof settings) => {
    // In a real app, this would save to an API
    console.log(`Saving ${category} settings:`, settings[category]);
    // Show success message
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'backup', name: 'Backup', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">
          Configure platform settings and integrations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center ${
                    selectedTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTab(tab.id as any)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {selectedTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Site Name"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: e.target.value }
                      })}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Input
                      label="Site Description"
                      value={settings.general.siteDescription}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, siteDescription: e.target.value }
                      })}
                    />
                  </div>
                  
                  <Input
                    label="Default Appointment Duration (minutes)"
                    type="number"
                    value={settings.general.appointmentDuration}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, appointmentDuration: parseInt(e.target.value) }
                    })}
                  />
                  
                  <Input
                    label="Max Appointments Per Day"
                    type="number"
                    value={settings.general.maxAppointmentsPerDay}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, maxAppointmentsPerDay: parseInt(e.target.value) }
                    })}
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">
                        Temporarily disable access to the platform
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, maintenanceMode: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">User Registration</h3>
                      <p className="text-sm text-gray-500">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.general.registrationEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, registrationEnabled: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('general')} leftIcon={<Save className="h-4 w-4" />}>
                  Save General Settings
                </Button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {selectedTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-green-800 font-medium">HIPAA Compliance Active</h3>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  All security measures are in place and compliant with HIPAA regulations.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication Required</h3>
                      <p className="text-sm text-gray-500">
                        Require all users to enable 2FA
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorRequired}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorRequired: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Data Encryption</h3>
                      <p className="text-sm text-gray-500">
                        Encrypt all sensitive data at rest and in transit
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.encryptionEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, encryptionEnabled: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Audit Logging</h3>
                      <p className="text-sm text-gray-500">
                        Log all user activities for compliance
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.auditLogging}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, auditLogging: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Session Timeout (minutes)"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                  />
                  
                  <Input
                    label="Password Minimum Length"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                    })}
                  />
                  
                  <Input
                    label="Max Login Attempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('security')} leftIcon={<Save className="h-4 w-4" />}>
                  Save Security Settings
                </Button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {selectedTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Send notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Send notifications via SMS
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsNotifications: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Appointment Reminders</h3>
                      <p className="text-sm text-gray-500">
                        Send automatic appointment reminders
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.appointmentReminders}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, appointmentReminders: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Security Alerts</h3>
                      <p className="text-sm text-gray-500">
                        Send alerts for security events
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.securityAlerts}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, securityAlerts: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Input
                    label="Reminder Hours Before Appointment"
                    type="number"
                    value={settings.notifications.reminderHours}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, reminderHours: parseInt(e.target.value) }
                    })}
                    className="max-w-xs"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('notifications')} leftIcon={<Save className="h-4 w-4" />}>
                  Save Notification Settings
                </Button>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {selectedTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Third-Party Integrations</h2>
                
                {/* Payment Integration */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Processing</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="Stripe API Key"
                        type={showApiKey ? 'text' : 'password'}
                        value={settings.integrations.stripeApiKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          integrations: { ...settings.integrations, stripeApiKey: e.target.value }
                        })}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>
                
                {/* Email Integration */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Email Service</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Provider
                      </label>
                      <select
                        value={settings.integrations.emailProvider}
                        onChange={(e) => setSettings({
                          ...settings,
                          integrations: { ...settings.integrations, emailProvider: e.target.value }
                        })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      >
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailgun">Mailgun</option>
                        <option value="ses">Amazon SES</option>
                      </select>
                    </div>
                    
                    <Input
                      label="SendGrid API Key"
                      type="password"
                      value={settings.integrations.sendgridApiKey}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: { ...settings.integrations, sendgridApiKey: e.target.value }
                      })}
                    />
                  </div>
                </div>
                
                {/* Video Integration */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Video Conferencing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video Provider
                      </label>
                      <select
                        value={settings.integrations.videoProvider}
                        onChange={(e) => setSettings({
                          ...settings,
                          integrations: { ...settings.integrations, videoProvider: e.target.value }
                        })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      >
                        <option value="agora">Agora</option>
                        <option value="twilio">Twilio Video</option>
                        <option value="zoom">Zoom</option>
                      </select>
                    </div>
                    
                    <Input
                      label="Agora App ID"
                      value={settings.integrations.agoraAppId}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: { ...settings.integrations, agoraAppId: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('integrations')} leftIcon={<Save className="h-4 w-4" />}>
                  Save Integration Settings
                </Button>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {selectedTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Backup & Recovery</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <h3 className="text-green-800 font-medium">Last Backup Successful</h3>
                      <p className="text-green-700 text-sm">
                        {new Date(settings.backup.lastBackup).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Automatic Backups</h3>
                      <p className="text-sm text-gray-500">
                        Enable scheduled automatic backups
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.backup.autoBackup}
                      onChange={(e) => setSettings({
                        ...settings,
                        backup: { ...settings.backup, autoBackup: e.target.checked }
                      })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Backup Frequency
                    </label>
                    <select
                      value={settings.backup.backupFrequency}
                      onChange={(e) => setSettings({
                        ...settings,
                        backup: { ...settings.backup, backupFrequency: e.target.value }
                      })}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Retention Period (days)"
                    type="number"
                    value={settings.backup.retentionDays}
                    onChange={(e) => setSettings({
                      ...settings,
                      backup: { ...settings.backup, retentionDays: parseInt(e.target.value) }
                    })}
                  />
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Backup Location
                    </label>
                    <select
                      value={settings.backup.backupLocation}
                      onChange={(e) => setSettings({
                        ...settings,
                        backup: { ...settings.backup, backupLocation: e.target.value }
                      })}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    >
                      <option value="s3">Amazon S3</option>
                      <option value="gcs">Google Cloud Storage</option>
                      <option value="azure">Azure Blob Storage</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <Button variant="outline">
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    Restore from Backup
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('backup')} leftIcon={<Save className="h-4 w-4" />}>
                  Save Backup Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;