function SettingsForm() {
  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-3xl font-black mb-8">
        Settings
      </h2>

      <div className="space-y-6">

        <label className="flex justify-between">
          Dark Mode
          <input type="checkbox" />
        </label>

        <label className="flex justify-between">
          Push Notifications
          <input type="checkbox" />
        </label>

        <label className="flex justify-between">
          SMS Notifications
          <input type="checkbox" />
        </label>

        <label className="flex justify-between">
          Email Notifications
          <input type="checkbox" />
        </label>

      </div>

    </div>
  );
}

export default SettingsForm;