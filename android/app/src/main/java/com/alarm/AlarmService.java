package com.alarm;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.Build;
import android.util.Log;

public class AlarmService extends Service {

    private static final String TAG = "AlarmService";

    @Override
    public IBinder onBind(final Intent intent) {
        Log.d(TAG, "On bind " + intent.getExtras());
        return null;
    }

    // called only the first time we start the service
    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Creating service");

    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Stopping service");
    }

    // triggered every time we call startService() when we start our service
    @Override
    public int onStartCommand(final Intent intent, final int flags, final int startId) {
        super.onStartCommand(intent, flags, startId);
        Log.d(TAG, "On start command");

//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
//            getactivity().setShowWhenLocked(true);
//            setTurnScreenOn(true);
//            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
//                    | WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
//        } else {
//            getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED    // deprecated api 27
//                    | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD     // deprecated api 26
//                    | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
//                    | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON   // deprecated api 27
//                    | WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
//        }
//
//        KeyguardManager keyguardManager = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
//
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            keyguardManager.requestDismissKeyguard(this, null);
//        }


        String alarmUid = intent.getStringExtra("ALARM_UID");
        Alarm alarm = Storage.getAlarm(getApplicationContext(), alarmUid);
        Notification notification = Helper.getAlarmNotification(this, alarm, 1);
        Manager.start(getApplicationContext(), alarmUid);
//        Helper.turnScreenOnAndKeyguardOff(getApplicationContext());

        startForeground(1, notification);

        // service will be explicitly started and stopped
        return START_STICKY;
    }

}